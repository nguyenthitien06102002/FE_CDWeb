import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Sidebar from "../../components/SideBar";
import { Col, Row, Table, Button } from 'antd';
import AdminNavbar from '../../components/AdminNavbar';

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://feisty-beauty-production.up.railway.app/api/orders');
            const data = await response.json();
            setOrders(data.reverse());
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    };

    const handleOrderDetail = (orderId) => {
        navigate(`/orderDetail/${orderId}`);
    };

    const getStatusColor = (statusName) => {
        switch (statusName) {
            case 'Chờ xác nhận':
                return '#f7c308';
            case 'Đang vận chuyển':
                return '#0292fd';
            case 'Nhận hàng thành công':
                return '#13ec38';
            case 'Đã hủy':
                return 'red';
            default:
                return 'black';
        }
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => <Button type="link" onClick={() => handleOrderDetail(record.id)}>{text}</Button>
        },
        {
            title: 'Người đặt hàng',
            dataIndex: 'orderName',
            key: 'orderName',
        },
        {
            title: 'Tổng đơn hàng',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Thời gian đặt hàng',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text) => formatDate(text),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span style={{ color: getStatusColor(status.statusName),fontWeight:'bolder'}}>
                    {status.statusName}
                </span>
            ),
        },
    ];

    return (
        <div>
            {/* <Row>
                <Col lg={4} style={{ marginRight: 25, background: '#9BCF53', height: '100vh' }}>
                    <Sidebar />
                </Col>
                <Col
                    xs={{ span: 24, order: 2 }}
                    sm={{ span: 24, order: 2 }}
                    md={{ span: 18, order: 1 }}
                    lg={{ span: 18, order: 1 }}
                    xl={{ span: 18, order: 1 }}
                    className='mt-4'
                >
                    <AdminNavbar/>
                    <Table dataSource={orders} columns={columns} />
                </Col>
            </Row> */}
           
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
                                    <h2>Quản lý đơn hàng</h2>
                                    {/* <Button>Thêm sản phẩm</Button> */}
                                </div>

                                <Table dataSource={orders} columns={columns} scroll={{ x: 'min-content' }} />
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        </div>


        
    );
};

export default ListOrder;
