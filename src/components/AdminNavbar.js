
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';

const { Search } = Input;

const AdminNavbar = () => {
	const onSearch = (value, _e, info) => console.log(info?.source, value);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const handleResize = () => {
		setIsMobile(window.innerWidth < 768);
	};

	// Add event listener for window resize
	React.useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return (
		<div>


			<div style={{ height: '80px', display: 'flex', justifyContent: 'flex-end', background: '#ffffff' }}>
				<div style={{ margin: '20px' }}>
					<div>
						{isMobile ? (
							<Button
								icon={<SearchOutlined />}
								onClick={() => alert('Search clicked!')}
								style={{ marginRight: '20px' }}
							/>
						) : (
							<Search
								placeholder="input search text"
								onSearch={onSearch}
								allowClear
								enterButton
								style={{
									width: 200,
									marginRight: '20px',
								}}
							/>
						)}
							<Avatar.Group>
						<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
						<a href="https://ant.design">
							<Avatar
								style={{
									backgroundColor: '#f56a00',
								}}
							>
								K
							</Avatar>
						</a>
						
						
					</Avatar.Group>
					</div>
				
				</div>

			</div>
		</div>

	)
}

export default AdminNavbar