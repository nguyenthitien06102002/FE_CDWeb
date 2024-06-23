import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../components/SideBar.css';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import logo from ".././Images/green.png";
const Sidebar = () => {
  
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
 
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768); // Update state on window resize
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const items = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: <Link to="/dashboard" style={{ 'textDecoration': 'none' }}>Trang chủ</Link>,
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: <Link to="/listOrderAdmin" style={{ 'textDecoration': 'none' }}>Đơn hàng</Link>,
    },
    {
      key: '3',
      icon: <ContainerOutlined />,
      label: <Link to="/listUserAdmin" style={{ 'textDecoration' :'none'}}>Người dùng</Link>,
    },
    {
      key: '4',
      icon: <ContainerOutlined />,
      label: <Link to="/listProductAdmin" style={{ 'textDecoration': 'none' }}>Sản phẩm</Link>,
    },
    {
      key: '5',
      icon: <LogoutOutlined />,
      label: <Link onClick={handleLogout} style={{ 'textDecoration': 'none' }}>Đăng xuất</Link>,
    },
  
  ];

  const navigate = useNavigate();

 

  return (
 
    <div style={{ background: '#9BCF53', width: collapsed ? '80px' : '100%' }}>
      <div
        style={{
          width: '100%',
        }}
      >
        <div className='mt-3 mb-4'>
          <Link to="/">
            <img className="logo" src={logo} style={{
              'width': '100%',
              'height': '60px',
              'margin': '0'
            }}></img>
          </Link>
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          // theme="light"
          inlineCollapsed={collapsed}
          items={items}
          style={{ backgroundColor: '#9BCF53' }}
       
        />
      </div>
    </div>

  );
};

export default Sidebar;
