import React from 'react'
import { Col, Row, Table, Button, message } from 'antd';
import Sidebar from '../../components/SideBar';
import AdminNavbar from '../../components/AdminNavbar';
import NewProductForm from './Product/NewProductForm';

const NewProductAdmin = () => {

  return (
	<div>
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
								  <h2>Thêm sản phẩm mới</h2>
								 
							  </div>
							  <NewProductForm />



						  </div>
					  </div>

				  </Col>
			  </Row>
		  </div>
	</div>
  )
}

export default NewProductAdmin