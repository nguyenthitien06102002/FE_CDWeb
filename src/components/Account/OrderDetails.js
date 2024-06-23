import { Button, Divider } from 'antd'
import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import './styles.css';
import { Popover, Steps } from 'antd';
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { Input } from 'antd';
import { Form } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";

const OrderDetails = () => {
	const navigate = useNavigate();
	const customDot = (dot, { status, index }) => (
		<Popover
			content={
				<span>
					step {index} status: {status}
				</span>
			}
		>
			{dot}
		</Popover>
	);
	const description = 'You can hover on the dot.';

	const { id } = useParams();
	const oderId = parseInt(id);
	const userData = JSON.parse(localStorage.getItem('userData'));
	const [orderDetail, setOrderDetail] = useState([]);
	const [infoOrder, setInfoOrder] = useState({});
	const [loading, setLoading] = useState(true);
	const [totalValue, setTotalValue] = useState(0);
	const fetchOrderDetail = async () => {
		try {
			const response = await axios.get(`http://feisty-beauty-production.up.railway.app/api/orderDetail/${userData.id}/${oderId}`);
			const orderDetailData = response.data;

			const updatedOrderDetail = await Promise.all(orderDetailData.map(async (item) => {
				const productResponse = await axios.get(`http://feisty-beauty-production.up.railway.app/api/imgProducts/${item.productId.id}`);
				const productData = productResponse.data;
				return {
					...item,
					productImage: productData[0].imgPath
				};
			}));

			setOrderDetail(updatedOrderDetail);
			console.log(updatedOrderDetail);
			const firstOrder = updatedOrderDetail[0];
			setInfoOrder(firstOrder);
			const totalValue = updatedOrderDetail.reduce((total, item) => total + item.productId.price - (item.productId.price * (item.productId.percentDiscount / 100)), 0);
			setTotalValue(totalValue);
		} catch (error) {
			setLoading(false);
		}
	};
	const updateStatusOrder = async (statusId) => {
		try {
			const response = await axios.put(`http://feisty-beauty-production.up.railway.app/api/orders/updateStatus/${infoOrder?.orderId?.id}?statusId=${statusId}`);
			console.log(response.data);
			window.alert('Bạn đã hủy đơn hàng thành công!');
			fetchOrderDetail();
		} catch (error) {

		}
	};
	useEffect(() => {



		fetchOrderDetail();
	}, [oderId]);
	const discountPrice = (totalValue + 30000) - infoOrder?.orderId?.totalPrice;

	//đánh giá

	const [comments, setComments] = useState({});
	const createReview = async () => {
		try {
			const promises = orderDetail.map(async (order) => {
				await axios.post(`http://feisty-beauty-production.up.railway.app/api/review`, {
					userId: { id: userData.id },
					productId: { id: order.productId.id },
					ordersId: { id: order.orderId.id },
					rating: rating[order.productId.id] || '5',
					content: comments[order.productId.id] || '',
					status: 1
				});
			});

			await Promise.all(promises);
			console.log('Đánh giá đã được tạo');
			window.alert('Đánh giá sản phẩm thành công');
			handleCancel();
			fetchOrderDetail();
		} catch (error) {
			console.error('Lỗi khi tạo đánh giá:', error);
		}
	};

	const handleCommentChange = (productId, value) => {
		setComments(prevState => ({
			...prevState,
			[productId]: value
		}));
		console.log(value);
	};


	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		createReview();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const [rating, setRating] = useState({});



	const ratingChanged = (newRating, productId) => {
		
		setRating(prevState => ({
			...prevState,
			[productId]: newRating
		}));
		console.log(newRating);


	};
	
	return (
		<div className='m-3  pb-4'>
			<div className='m-3 pt-3'>

				<div className="navbar-order">
					<div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}><LeftOutlined /> <span className="back-text">TRỞ LẠI</span></div>
					<div>MÃ ĐƠN HÀNG {infoOrder?.orderId?.id}  |  <span style={{ color: 'green', textTransform: 'uppercase' }}>{infoOrder?.orderId?.status?.statusName}</span></div>
				</div>
				<Divider orientation="left">Chi tiết đơn hàng</Divider>

			</div>

			<div className='mt-4 pt-4 mb-4 pb-4'>


				{infoOrder?.orderId?.status?.id === 5 ? (
					<h5 className='text-danger'>Đơn hàng đã hủy</h5>
				) : (
					<Steps
						current={infoOrder?.orderId?.status?.id - 1}
						progressDot={customDot}
						items={[
							{
								title: 'Chờ xác nhận',

							},
							{
								title: 'Đang giao hàng',

							},
							{
								title: 'Giao hàng thành công',

							},
							{
								title: 'Đánh giá',

							},
						]}
					/>

				)}
				<Divider className='m-3 pt-3' />
				<div className='m-3 mb-4'>
					<h5>Địa chỉ nhận hàng</h5>
					<p>(+84) {infoOrder?.orderId?.phone}</p>
					<p>{infoOrder?.orderId?.email}</p>
					<p>{infoOrder?.orderId?.address}, {infoOrder?.orderId?.districtId?.districtName}, {infoOrder?.orderId?.provinceId?.provinceName}</p>

				</div>
				<Divider className='m-3 pt-3' />

				{orderDetail.map((item) => (

					<div className='m-3 mb-4' key={item.orderDetailId} >
						<div className="product-row">
							<img src={item.productImage} className='image' alt='Product' />
							<div className="info">
								<h6 className="product-name">{item.productId.productName}</h6>
								<p className='mt-3'>x {item.quantity}</p>
							</div>
							<p className="product-price">{numeral(item.productId.price - (item.productId.price * (item.productId.percentDiscount / 100))).format('0,0')} đ</p>
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
								<td>{numeral(infoOrder?.orderId?.totalPrice).format('0,0')} đ</td>
							</tr>
							<tr>
								<td>Phương  thức thanh toán</td>

								{infoOrder?.orderId?.payment === 1 ? (
									<td>
										khi nhận hàng
									</td>
								) : (

									<td>
										Paypal
									</td>

								)}
							</tr>
						</tbody>
					</Table>

				</div>

				{infoOrder?.orderId?.status?.id === 1 ? (
					<div className='pt-4' style={{ display: 'flex', justifyContent: 'center' }}>
						<Button variant="primary" className='text-center' style={{ backgroundImage: 'linear-gradient(310deg, rgb(155, 207, 83), rgb(65, 109, 25))', border: 'none', fontWeight: 'bold', color: 'white' }}
							onClick={() => updateStatusOrder(5)}>
							Hủy đơn hàng
						</Button>
					</div>
				) : (

					infoOrder?.orderId?.status?.id === 3 ? (
						<div className='pt-4' style={{ display: 'flex', justifyContent: 'center' }}>
							<Button variant="primary" className='text-center' style={{ backgroundImage: 'linear-gradient(310deg, rgb(155, 207, 83), rgb(65, 109, 25))', border: 'none', fontWeight: 'bold', color: 'white' }}
								onClick={showModal}>
								Đánh giá
							</Button>
						</div>
					) : (null)
				)}


			</div>

			<Modal title="Đánh giá sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Lưu">
				<div>
					{orderDetail.map((item) => (

						<div className='m-3 mb-4' key={item.orderDetailId} >
							<div className="product-row">
								<img src={item.productImage} className='image' alt='Product' style={{ width: '80px' }} />
								<div className="info">
									<h6 className="product-name">{item.productId.productName}</h6>
								</div>
							</div>
							<div className='mt-3' style={{ display: 'flex', alignItems: 'center' }}>
								<h6 style={{ marginRight: '10px', margin: 0, padding: 0 }}>Chất lượng sản phẩm: </h6>
								<ReactStars
									count={5}
									value={5}

									onChange={(newRating) => ratingChanged(newRating, item.productId.id)}
									size={30}
									activeColor="#ffd700"
								/>
							</div>
							<div className='mt-4 mb-4'>
								{/* <TextArea rows={4} placeholder="Nhập đánh giá của bạn về sản phẩm của chúng tôi" maxLength={6} 
									onChange={(e) => handleCommentChange(item.productId.id, e.target.value)}
								/> */}
								<Form.Control as="textarea" rows={5}
									onChange={(e) => handleCommentChange(item.productId.id, e.target.value)}
								/>

							</div>
						</div>

					))}

				</div>
			</Modal>

		</div>
	)
}

export default OrderDetails