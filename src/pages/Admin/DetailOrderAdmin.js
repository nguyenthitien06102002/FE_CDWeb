import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Descriptions, Tag, Divider, Steps, Popover } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import numeral from 'numeral';
import Table from 'react-bootstrap/Table';
import Sidebar from '../../components/SideBar';
import AdminNavbar from '../../components/AdminNavbar';
import { Row, Col, Button } from 'antd';

const DetailOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    fetchOrderDetail();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://feisty-beauty-production.up.railway.app/api/orders/id=${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const fetchOrderDetail = async () => {
    try {
      const response = await axios.get(`http://feisty-beauty-production.up.railway.app/api/orderDetail/${id}`);
      const orderDetails = response.data;

      const updatedOrderDetail = await Promise.all(orderDetails.map(async (item) => {
        const productResponse = await axios.get(`http://feisty-beauty-production.up.railway.app/api/imgProducts/${item.productId.id}`);
        const productData = productResponse.data;
        return {
          ...item,
          productImage: productData[0].imgPath
        };
      }));

      setOrderDetail(updatedOrderDetail);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order detail:', error);
      setLoading(false);
    }
  };

  const updateStatusOrder = async (statusId) => {
    try {
      const response = await axios.put(`http://feisty-beauty-production.up.railway.app/api/orders/updateStatus/${order.id}?statusId=${statusId}`);
      console.log(response.data);
      alert('Cập nhật trạng thái đơn hàng thành công!');
      fetchOrder();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleConfirmOrder = () => {
    let nextStatusId;
    if (order.status.id === 1) {
      nextStatusId = 2; // Đang giao hàng
    } else if (order.status.id === 2) {
      nextStatusId = 3; // Giao hàng thành công
    }
    updateStatusOrder(nextStatusId);
  };

  const customDot = (dot, { status, index }) => (
    <Popover content={<span>step {index} status: {status}</span>}>
      {dot}
    </Popover>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalValue = orderDetail.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  const discountPrice = totalValue + 30000 - order.totalPrice;

  return (


    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Row style={{ flex: '1 0 auto', overflow: 'hidden' }}>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} style={{ background: '#9BCF53', height: '100vh', overflowY: 'auto' }}>
          <Sidebar />
        </Col>
        <Col xs={18} sm={18} md={18} lg={18} xl={18} style={{ height: '100vh', overflowY: 'auto' }}>
          <div>
            <AdminNavbar />
          </div>
          <div style={{ backgroundImage: 'linear-gradient(310deg, rgb(255 246 126), rgb(155 207 83))', minHeight: '50vh', position: 'relative' }}>
            <div style={{
              top: '0%',
              left: '50%',
              position: 'absolute',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              padding: '40px',
              width: '90%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              marginTop: '20px',
              overflow: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Chi tiết đơn hàng</h2>
                {/* <Button>Thêm sản phẩm</Button> */}
              </div>

              <div>
                <div className='m-3 pb-4'>
                  <div className='m-3 pt-3'>
                    <div className="navbar-order">
                      <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                        <LeftOutlined /> <span className="back-text">TRỞ LẠI</span>
                      </div>
                      <div>MÃ ĐƠN HÀNG {order.id}  |  <span style={{ color: 'green', textTransform: 'uppercase' }}>{order.status.statusName}</span></div>
                    </div>
                    <Divider orientation="left">Chi tiết đơn hàng</Divider>
                  </div>

                  <div className='mt-4 pt-4 mb-4 pb-4'>
                    {order.status.id === 5 ? (
                      <h5 className='text-danger'>Đơn hàng đã hủy</h5>
                    ) : (
                      <Steps current={order.status.id - 1} progressDot={customDot}>
                        <Steps.Step title="Chờ xác nhận" />
                        <Steps.Step title="Đang giao hàng" />
                        <Steps.Step title="Giao hàng thành công" />
                        <Steps.Step title="Đánh giá" />
                      </Steps>
                    )}
                    <Divider className='m-3 pt-3' />
                    <div className='m-3 mb-4'>
                      <h5>Địa chỉ nhận hàng</h5>
                      <p>(+84) {order.phone}</p>
                      <p>{order.email}</p>
                      <p>{order.address}, {order.districtId.districtName}, {order.provinceId.provinceName}</p>
                    </div>
                    <Divider className='m-3 pt-3' />

                    {orderDetail.map((item) => (
                      <div className='m-3 mb-4' key={item.orderDetailId}>
                        <div className="product-row">
                          <img src={item.productImage} className='image' alt='Product' />
                          <div className="info">
                            <h6 className="product-name">{item.productId.productName}</h6>
                            <p className='mt-3'>x {item.quantity}</p>
                          </div>
                          <p className="product-price">{numeral(item.productId.price).format('0,0')} đ</p>
                        </div>
                      </div>
                    ))}

                    <Divider className='m-3 pt-3' />
                    <div className='m-3 mb-4'>
                      <Table striped bordered hover className='text-end'>
                        <tbody>
                          <tr>
                            <td>Tổng tiền hàng</td>
                            <td>{numeral(totalValue).format('0,0')} đ</td>
                          </tr>
                          <tr>
                            <td>Phí vận chuyển</td>
                            <td>30,000 đ</td>
                          </tr>
                          <tr>
                            <td>Mã giảm giá</td>
                            <td>- {numeral(discountPrice).format('0,0')} đ</td>
                          </tr>
                          <tr>
                            <td>Thành tiền</td>
                            <td>{numeral(order.totalPrice).format('0,0')} đ</td>
                          </tr>
                          <tr>
                            <td>Phương thức thanh toán</td>
                            {order.payment === 1 ? (
                              <td>khi nhận hàng</td>
                            ) : (
                              <td>Paypal</td>
                            )}
                          </tr>
                        </tbody>
                      </Table>
                    </div>

                    <div className='pt-4' style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      {order.status.id === 1 && (
                        <Button
                          type="primary"
                          style={{ backgroundImage: 'linear-gradient(310deg, rgb(155, 207, 83), rgb(65, 109, 25))', border: 'none', fontWeight: 'bold', color: 'white' }}
                          onClick={() => updateStatusOrder(5)}
                        >
                          Hủy đơn hàng
                        </Button>
                      )}
                      {(order.status.id === 1 || order.status.id === 2) && (
                        <Button
                          type="primary"
                          style={{ backgroundImage: 'linear-gradient(310deg, rgb(83, 207, 155), rgb(25, 109, 65))', border: 'none', fontWeight: 'bold', color: 'white' }}
                          onClick={handleConfirmOrder}
                        >
                          Xác nhận đơn hàng
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </Col>
      </Row>
    </div>
  );
};

export default DetailOrder;
