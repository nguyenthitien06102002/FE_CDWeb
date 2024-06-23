import React from 'react'
import { Divider, Space, Table, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Ordertable = ({ orders }) => {
	const columns = [
		{
			title: 'Mã',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Người dùng',
			dataIndex: 'userId',
			key: 'userId',
			render: (userId) => <a>{userId.userName}</a>,
		},

		{
			title: 'Địa chỉ',
			dataIndex: 'address',
			key: 'address',
			render: (_, record) => <a>{record.districtId.districtName}, {record.provinceId.provinceName}</a>,
		},
		{
			title: 'Tổng tiền',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
		},
		{
			title: 'Ngày đặt',
			dataIndex: 'createTime',
			key: 'createTime',
			render: (createTime) => <a>{createTime.slice(0, 10)}</a>
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',
			render: (status) =>
				status.id === 1 ? (
					<Tag color='gray'>Chờ xác nhận</Tag>
				) : (status.id === 2 ? (
					<Tag color='blue'>Đang giao hàng</Tag>
				) : (status.id === 3 ? (
					<Tag color='green'>Đang hàng thành công</Tag>
				) : (status.id === 4 ? (
					<Tag color='yellow'>Đã đánh giá</Tag>
				) : (
					<Tag color='red'>Đã hủy</Tag>
				))))
		},
		{
			title: 'Hàng động',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Link to={`order-details/${record.id}`} style={{ color: 'green' }}>Chi tiết</Link>
				</Space>
			),
		},
	];
	const data = [
		{
			id: '1',
			user: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
			price: '$100',
			date: '23-01-2021',
			status: 1,
		},

	];
	return (
		<div style={{ overflowX: 'auto' }}>

			<Table
				columns={columns}
				dataSource={orders}
				style={{ minWidth: '600px' }}
			/>
		</div>
	)
}

export default Ordertable