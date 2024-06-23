import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';



const TableProduct = () => {

	const [products, setProducts] = useState([]);
	const navigate = useNavigate();
	const fetchProducts = async () => {
		try {
			const response = await axios.get('http://feisty-beauty-production.up.railway.app/api/products');
			const productsData = response.data;

			const productsWithImages = await Promise.all(productsData.map(async (product) => {
				try {
					const imgResponse = await axios.get(`http://feisty-beauty-production.up.railway.app/api/imgProducts/${product.id}`);
					return { ...product, imageUrl: imgResponse.data[0].imgPath };
				} catch (imgError) {
					console.error(`Failed to fetch image for product ${product.id}`, imgError);
					return product;
				}
			}));

			setProducts(productsWithImages.reverse());
			console.log(productsWithImages);
		} catch (error) {
			console.error('Failed to fetch products', error);
		}
	};
	useEffect(() => {
		

		fetchProducts();
	}, []);
	const deleteProduct = async (idProduct, name) => {
		try {

			const confirmDelete = window.confirm('Bạn muốn xóa sản phẩm ' + name + ' ?');

			if (confirmDelete) {

				const response = await axios.put(`/api/products/deleteProduct/${idProduct}`);

				fetchProducts();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const columns = [
		{
			title: 'Mã sp',
			dataIndex: 'id',
			key: 'id',
			width: '100px',
			
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'productName',
			key: 'productName',
			render: (productName, product) => (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<img src={product.imageUrl} style={{ width: '50px', marginRight: '10px' }} alt={`Product ${product.id}`} />
					<div style={{
						maxWidth: '200px', // Adjust this value as needed
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap'
					}}>
						{productName}
					</div>
				</div>
			),
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
			render: (price) => {
				return `${price.toLocaleString()} `; 
			}
		},
		{
			title: 'Giá khuyến mãi',
			dataIndex: 'percentDiscount',
			key: 'percentDiscount',
			render: (percentDiscount, product) => {
				const discountPrice = product.price - (product.price * percentDiscount / 100);
				return `${discountPrice.toLocaleString()} `;
			},
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
			key: 'quantity',
			
		},
		
		{
			title: ' ',
			key: 'index',
			render: (_, record) => (
				<Space size="middle">
					
					<EditOutlined onClick={() => navigate(`/editProductAdmin/${record.id}`, { state: { product: record } })} />
					<DeleteOutlined onClick={() => deleteProduct(record.id, record.productName)} />
				</Space>
			),
		},
	];
  return (
	  <div ><Table columns={columns} dataSource={products} scroll={{ x: 'min-content' }} /></div>
  )
}

export default TableProduct