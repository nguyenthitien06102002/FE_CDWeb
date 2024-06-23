import { Button } from 'antd';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, listAll } from "firebase/storage";
import { v4 } from 'uuid'
import { imageDb } from '../../../components/FireBaseImage/Config';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const EditImageProduct = () => {
	const { id } = useParams();
	const fetchImages = async () => {
		try {
			const response = await axios.get(`http://feisty-beauty-production.up.railway.app/api/imgProducts/${id}`);
			setImagesProduct(response.data);

		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchImages();
	}, [id]);

	const [imagesProduct, setImagesProduct] = useState([]);
	const [images, setImages] = useState([]);
	const [product, setProduct] = useState(null);
	const [img, setImg] = useState('');
	const [imageURL, setImageURL] = useState('');
	const [selectedImages, setSelectedImages] = useState([]);

	const handleFileChange = (e) => {
		const files = e.target.files;
		setImg(files);
		const urls = [];
		for (let i = 0; i < files.length; i++) {
			const url = URL.createObjectURL(files[i]);
			urls.push(url);
		}
		setSelectedImages(urls);
		// console.log(urls);
	};

	const handleDeleteImageChose = (index) => {
		const newSelectedImages = [...selectedImages];
		newSelectedImages.splice(index, 1);
		setSelectedImages(newSelectedImages);
	};

	const handleDeleteImage = (idImage) => {
		deleteImage(idImage);
	};

	const deleteImage = async (idImage) => {
		try {
			const response = await axios.delete(`http://feisty-beauty-production.up.railway.app/api/imgProducts/detele/${idImage}`);
			fetchImages();

		} catch (error) {
			console.error(error);
		}
	};

	const handClick = () => {
		const files = Array.from(document.querySelector('input[type=file]').files);
		let uploadedCount = 0;

		files.forEach((file) => {
			const imgRef = ref(imageDb, `files/${v4()}`);
			uploadBytes(imgRef, file).then((value) => {
				console.log(value);
				getDownloadURL(value.ref).then((url) => {
					setImageURL((prevUrls) => [...prevUrls, url]);

					axios.post(`http://feisty-beauty-production.up.railway.app/api/imgProducts`, {
						productID: {
							id: id
						},
						caption: 'caption',
						imgPath: url
					}, {
						headers: {
							'Content-Type': 'application/json'
						}
					}).then((response) => {

						uploadedCount++;
						if (uploadedCount === files.length) {
							window.alert('Bạn đã thêm ảnh thành công');
						}


					}).catch((error) => {
						console.error('Error uploading image:', error);
					});
				});
			}).catch((error) => {
				console.error('Error uploading image:', error);
			});
		});
	}

  return (
	<div>
		  <div>
			  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
				  {imagesProduct.map((image, index) => (
					  <div style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }} key={index}>
						  <img src={image.imgPath} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
						  <button
							  style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}
							  onClick={() => handleDeleteImage(image.id)}
						  >X</button>
					  </div>
				  ))}

				  {selectedImages.map((image, index) => (

					  <div key={index} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
						  <img src={image} alt={`Selected ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
						  <button onClick={() => handleDeleteImageChose(index)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>X</button>
					  </div>
				  ))}


				  <div style={{ position: 'relative' }}>
					  <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} multiple />

					  <label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'inline-block', padding: '10px 20px', width: '100px', height: '100px', border: '2px dashed #ccc', borderRadius: '5px', color: '#333', transition: 'all .3s', }}>
						  <span style={{ fontSize: '20px', marginRight: '10px' }}>+</span> Thêm ảnh
					  </label>
				  </div>

			  </div>

			  <label htmlFor="contained-button-file" style={{ display: 'flex', justifyContent: 'center' }}>
				  <Button component="span"
					  onClick={handClick} 
				  >
					  Cập nhật
				  </Button>
			  </label>
		  </div>

	</div>
  )
}

export default EditImageProduct