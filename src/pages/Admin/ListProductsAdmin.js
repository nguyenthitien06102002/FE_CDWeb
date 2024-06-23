import React from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import Sidebar from "../../components/SideBar";
import AdminNavbar from '../../components/AdminNavbar';
import TableProduct from './Product/TableProduct';
import { useNavigate } from 'react-router-dom';
const ListProducts = () => {
    const navigate = useNavigate();




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
                                <h2>Tất cả sản phẩm</h2>
                                <Button onClick={() => navigate('/newProductAdmin')}>Thêm sản phẩm</Button>
                            </div>

                            <TableProduct />
                        </div>
                    </div>

                </Col>
            </Row>
        </div>
    );
}

export default ListProducts;
