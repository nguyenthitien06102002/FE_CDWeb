import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import {
	LogoutOutlined,
	ContainerOutlined,
	UnorderedListOutlined,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';

const handleLogout = () => {

	localStorage.removeItem('userData');

	window.location.href = '/';
};

const items = [
	{
		key: '1',
		icon: <PieChartOutlined />,
		label: (
			<Link to="info" style={{textDecoration: 'none'}}>Tài khoản</Link> )
	},
	{
		key: '2',
		icon: <UnorderedListOutlined />,
		label: (
			<Link to="order" style={{ textDecoration: 'none' }}>Đơn mua</Link>)
	},
	{
		key: '3',
		icon: <ContainerOutlined />,
		label: (
			<Link to="changePassword" style={{ textDecoration: 'none' }}>Đổi mật khẩu</Link>),
	},
	{
		key: '4',
		icon: <LogoutOutlined/>,
		label: 'Đăng xuất',
		onClick: handleLogout,
	},
];






const SidebarAccount = () => {
	// const isSmallScreen = useMediaQuery({ query: '(max-width: 1237px)' });
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};
	const userData = JSON.parse(localStorage.getItem('userData'));
  return (
	<div className='mt-4 mb-4'>
		
		  <div
			  style={{
				  width: 256,
			  }}
		  >
			  
			  <Space size={24} className='m-3'>
				  <Badge dot>
					  <Avatar shape="square" icon={<UserOutlined />} />
				  </Badge>
				  <h6>{userData.userName}</h6>
			  </Space>
			  <Menu
				  defaultSelectedKeys={['1']}
				  defaultOpenKeys={['sub1']}
				  mode="inline"
				  theme="light"
				  inlineCollapsed={collapsed}
				  items={items}
			  />
		  </div>

		
	</div>
  )
}

export default SidebarAccount