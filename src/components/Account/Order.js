import React, {useEffect,useState} from 'react'
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Divider, Tabs } from 'antd';
import Ordertable from './OrderTable/Ordertable';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Order = () => {
	const userData = JSON.parse(localStorage.getItem('userData'));
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const onChange = (key) => {
		// console.log(key);
	};


	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get(`http://feisty-beauty-production.up.railway.app/api/orders/${userData.id}`);
				setOrders(response.data);	
				setLoading(false);
			} catch (error) {
				console.error('Error fetching orders:', error);
				setLoading(false);
			}
		};

		fetchOrders();
	}, [userData.id]);

	const getFilteredOrders = (statusId) => {
		if (statusId === null) return orders;
		return orders.filter(order => order.status.id === statusId);
	};
	const items = [
		{
			key: '1',
			label: 'Tất cả',
			children: <Ordertable orders={orders}/>,
		},
		{
			key: '2',
			label: 'Chờ xác nhận',
			children: <Ordertable orders={getFilteredOrders(1)} loading={loading} />,
		},
		{
			key: '3',
			label: 'Đang giao',
			children: <Ordertable orders={getFilteredOrders(2)} loading={loading} />,
		},
		{
			key: '4',
			label: 'Giao hàng thành công',
			children: <Ordertable orders={getFilteredOrders(3)} loading={loading} />,
		},
		{
			key: '5',
			label: 'Đánh giá',
			children: <Ordertable orders={getFilteredOrders(4)} loading={loading} />,
		},
		{
			key: '6',
			label: 'Đã hủy',
			children: <Ordertable orders={getFilteredOrders(5)} loading={loading} />,
		},
	];
  return (
	  <div className='m-3  pb-4'>
		  <div className='m-3 pt-3'>

			  <p>Quản lý đơn hàng theo dõi trạng thái đơn hàng</p>
			  <Divider orientation="left">Đơn mua của tôi</Divider>
		  </div>
		  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
	</div>
  )
}

export default Order