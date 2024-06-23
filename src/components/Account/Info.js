import React, {useState} from 'react'
import { Button, Form, Input } from 'antd';
import { Divider } from 'antd';

export const Info = () => {
	const userData = JSON.parse(localStorage.getItem('userData'));
	const [phone, setPhone] = useState(userData?.phone);

	return (
		<div className='mt-4 mb-4'>
			<div className='m-3 pt-3'>

				<p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
				<Divider orientation="left">Hồ sơ của tôi</Divider>
			</div>



			<Form className='pt-3 m-3'
				name="wrap"
				labelCol={{
					flex: '110px',
				}}
				labelAlign="left"
				labelWrap
				wrapperCol={{
					flex: 1,
				}}
				colon={false}
				style={{
					maxWidth: 600,
				}}
			>
				<Form.Item
					label="Tên người dùng"
					name="username"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input className='border' />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input className='border' />
				</Form.Item>


				<Form.Item
					label="Số điện thoại"
					name="phone"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input className='border' value={phone} onChange={e => setPhone(e.target.value)} />
				</Form.Item>

				<Form.Item label=" ">
					<Button type="primary" htmlType="submit" style={{ backgroundImage: 'linear-gradient(310deg, rgb(155, 207, 83), rgb(65, 109, 25))', border: 'none', fontWeight: 'bold'}}>
						Lưu
					</Button>
				</Form.Item>
			</Form>


		</div>
	)
}
