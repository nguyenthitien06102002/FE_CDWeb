import React, { useState,useEffect  } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaFacebook, FaFacebookMessenger  } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useCart } from "../../pages/CartContext";
import numeral from "numeral";


const ProductDetails = ({ selectedProduct, averageRating }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const [productImages, setProductImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [rating, setRating] = useState(0);
  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        if (selectedProduct) {
          const imageResponse = await axios.get(`http://feisty-beauty-production.up.railway.app/api/imgProducts/${selectedProduct.id}`);
          console.log(imageResponse.data);
          setProductImages(imageResponse.data);
          setSelectedImage(imageResponse.data[0].imgPath);
        }
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };
    
    fetchProductImage();
    setRating(averageRating);
  }, [selectedProduct]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const { fetchCartItemsCount } = useCart();

  const addToCart = async () => {
    if (!userData || !userData.id) {
      // console.error('User data is missing or incomplete');
      window.alert('Bạn hãy đăng nhập để tiếp tục mua sắm !!');
      return;
    }
    try {
      const response = await axios.post('http://feisty-beauty-production.up.railway.app/api/cart/add', {
        user: {
          id: userData.id
        },
        product: {
          id: selectedProduct.id
        },
        quantity: quantity
      });

      if (response.status === 200) {

        window.alert('Bạn đã thêm sản phẩm ' + selectedProduct.productName + ' vào giỏ hàng thành công !!');
        fetchCartItemsCount();
       
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };


  const starttting = Math.round(rating)

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
           
            <img loading="lazy" src={selectedImage} alt="" />
           
              <Carousel
              responsive={responsive}
            >
              {productImages?.map((productImage) => (
                 <div key={productImage.id}>
                <img
                  style={{ height: "110px", objectFit: "cover", padding: "5px" }}
                  loading="lazy"
                  src={productImage?.imgPath}
                  alt=""
                  onClick={(index, item) =>
                    handleImageClick(productImage?.imgPath)
                  }
                />
              </div> 
              ))} 
            
            </Carousel>
          </Col>
          <Col md={6}>
            <h2>{selectedProduct.productName}</h2>
            <div className="rate">
              <div style={{ color: 'yellow' }}>
                {Array.from({ length: starttting }, (_, index) => (
                  <i key={index} className="fa fa-star" style={{ marginLeft: '5px' }}></i>
                ))}
              </div>

              <span> Đánh giá : {starttting}/5</span>
            </div>
            <div className="info">
              <span className="price">{numeral((selectedProduct?.price - (selectedProduct?.price * (selectedProduct?.percentDiscount /100) ))).format('0,0')} đ</span>

              <span>Danh mục: {selectedProduct?.category.name}</span>

            </div>
            {/* <p>{selectedProduct.detail}</p> */}
            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
             
            />
            <button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={addToCart}
            
            >
              Thêm vào giỏ hàng
            </button>
            <hr className="hr" />
            <div className="info">
              <span >Chia sẻ : </span>
              <span style={{fontSize: '25px'}}><FaFacebook/> <FaFacebookMessenger /></span>
            </div>
            
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
