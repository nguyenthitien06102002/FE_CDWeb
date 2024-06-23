import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
	Button,
	Cascader,
	Checkbox,
	Col,
	ColorPicker,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Row,
	Select,
	Slider,
	Switch,
	TreeSelect,
	Upload,
} from 'antd';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, listAll } from "firebase/storage";
import { v4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { imageDb } from '../../../components/FireBaseImage/Config';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};

const EditProductForm = () => {
	const location = useLocation();
	const product = location.state?.product;
	const [category, setCategory] = useState([]);
	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const response = await axios.get(`http://feisty-beauty-production.up.railway.app/api/category`);
				const activeCategories = response.data.filter(category => category.active === true);
				setCategory(activeCategories);


			} catch (error) {
				console.error(error);
			}
		};
		fetchCategory();


	}, []);

	const [productName, setProductName] = useState('');
	const [stock, setStock] = useState('');
	const [detail, setDetail] = useState('');
	const [price, setPrice] = useState('');
	const [salePrice, setSalePrice] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	
	useEffect(() => {
		if (product) {
			setProductName(product.productName);
			setSelectedCategory(product.category.id);
			setPrice(product.price);
			setSalePrice(product.percentDiscount);
			setDetail(product.detail);
			setStock(product.quantity);
		}
	}, [product]);

	const { Option } = Select;


	const handleChangeCategory = (value) => {
		console.log(value);
		setSelectedCategory(value);
	};
	const handleStockChange = (value) => {
		setStock(value);
		console.log(value);
	};

	const updateProducts = async () => {
		try {
			const response = await axios.put(`http://feisty-beauty-production.up.railway.app/api/products/update/${product.id}`, {
				productName: productName,
				detail: detail,
				price: price,
				percentDiscount: salePrice,
				quantity: stock,
				category: {
					id: selectedCategory
				},
				
			});

			console.log('Product new:', response.data);
		
		} catch (error) {
			console.error('Error updating product:', error);
			window.alert('Cập nhật thông tin sản phẩm thành công');
		}
	};





	return (
		<div>
			<>

				<Form
					labelCol={{
						span: 4,
					}}
					// wrapperCol={{
					// 	span: 14,
					// }}
					// layout="horizontal"

					style={{
						maxWidth: '100%',
					}}
				>


					<Form.Item label="Tên sản phẩm" >
						<Input className='border' value={productName} onChange={(e) => setProductName(e.target.value)} />
					</Form.Item>
					<Form.Item label="Phân loại">
						<Select defaultValue="" onChange={handleChangeCategory}>
							<Option value={selectedCategory}>{product.category.name}</Option>
							{category.map((category) => (
								<Option key={category.id} value={category.id}>
									{category.name}
								</Option>
							))}
						</Select>

					</Form.Item>
					<Form.Item label="Giá">
						<Input className='border' value={price} onChange={(e) => setPrice(e.target.value)} />
					</Form.Item>
					<Form.Item label="% khuyến mãi">
						<Input className='border' value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
					</Form.Item>
					<Form.Item label="Số lượng">
						<InputNumber value={stock} onChange={handleStockChange} />
					</Form.Item>
					<Form.Item label="Chi tiết">

						<div>
							{/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
							<ReactQuill
								value={detail}
								onChange={(value) => setDetail(value)}

							/>
						</div>
					</Form.Item>

					{/* <Form.Item label="Hình ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
						
						<div style={{ marginTop: '50px', marginBottom: '50px' }} className='border p-2'>
							<div style={{ display: 'flex', flexWrap: 'wrap' }}>
								{selectedImages.map((image, index) => (

									<div key={index} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
										<img src={image} alt={`Selected ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
										<button onClick={() => handleDeleteImageChose(index)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>X</button>
									</div>
								))}
							</div>

							<div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
								<input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} multiple />

								<label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'inline-block', padding: '10px 20px', width: '100px', height: '100px', border: '2px dashed #ccc', borderRadius: '5px', color: '#333', transition: 'all .3s', }}>
									<span style={{ fontSize: '20px', marginRight: '10px' }}>+</span> Thêm ảnh
								</label>
							</div>

						</div>
					</Form.Item> */}
					<Form.Item label=" Chỉnh sửa" >
						<Button type='primary' onClick={updateProducts}>Lưu</Button>
					</Form.Item>

				</Form>
			</>
		</div>
	)
}

export default EditProductForm