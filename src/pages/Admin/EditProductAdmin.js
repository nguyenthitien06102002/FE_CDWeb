import React from 'react'
import { Col, Row, Table, Button, message } from 'antd';
import Sidebar from '../../components/SideBar';
import AdminNavbar from '../../components/AdminNavbar';
import NewProductForm from './Product/NewProductForm';
import EditProductForm from './Product/EditProductForm';
import EditImageProduct from './Product/EditImageProduct';

const EditProductAdmin = () => {

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
						<div style={{
							position: 'relative',
							minHeight: '50vh'
						}}>
							<div style={{
								position: 'absolute',
								top: '0',
								left: '0',
								width: '100%',
								height: '50%',
								backgroundImage: 'linear-gradient(310deg, rgb(255 246 126), rgb(155 207 83))'
							}}></div>

							<div style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
								padding: '20px',
								position: 'relative',
								flexWrap: 'wrap' 
							}}>
								<div style={{
									flex: '7 1 0%', 
									marginRight: '10px',
									backgroundColor: 'white',
									padding: '40px',
									boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
									borderRadius: '10px',
									overflow: 'auto',
									minWidth: '300px', 
									marginBottom: '20px'
								}}>
									<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
										<h5>Chỉnh sửa thông tin sản phẩm</h5>
									</div>
									<EditProductForm />
								</div>
								<div style={{
									flex: '3 1 0%', 
									marginLeft: '10px',
									backgroundColor: 'white',
									padding: '40px',
									boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
									borderRadius: '10px',
									overflow: 'auto',
									minWidth: '300px', 
									marginBottom: '20px'
								}}>
									<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
										<h5>Chỉnh sửa thông tin sản phẩm</h5>
									</div>

									<EditImageProduct/>
								</div>
							</div>
						</div>




					</Col>
				</Row>
			</div>
		</div>
	)
}

export default EditProductAdmin