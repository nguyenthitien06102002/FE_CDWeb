import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import numeral from 'numeral';
import { useState } from "react";
import axios from 'axios';
import { useCart } from "../../pages/CartContext";

const ProductCard = ({ title, productItem }) => {
  const { fetchCartItemsCount } = useCart();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const price = productItem.price;
  const salePrice = price - (price * (productItem.percentDiscount/100));

  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };

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
          id: productItem.id
        },
        quantity: 1
      });

      if (response.status === 200) {

        window.alert('Bạn đã thêm sản phẩm ' + productItem.productName + ' vào giỏ hàng thành công !!');
        fetchCartItemsCount();
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };




  return (
    <Col md={3} sm={5} xs={10} className="product mtop" >
      {title === "Sản phẩm giảm giá" ? (
        <span className="discount">{productItem.percentDiscount}% Off</span>
      ) : null}
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={productItem.imageUrl}
        alt=""
      />
      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.productName}</h3>
        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="price">
          <h4>{numeral(salePrice).format('0,0')}đ</h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={addToCart}
            title="Thêm vào giỏ hàng"
          >
            <ion-icon name="add"></ion-icon>

          </button>
        </div>

      </div>

    </Col>

  );
};

export default ProductCard;
