import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import axios from "axios";
import numeral from "numeral";
import { useCart } from "./CartContext";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [cartItems, setCartItems] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const fetchCartItems = async () => {
    if (!userData || !userData.id) {
      setShowMessage(true);
      return;
    }

    try {
      const response = await axios.get(`http://feisty-beauty-production.up.railway.app/api/cart/items/${userData.id}`);
      setCartItems(response.data);
      setShowMessage(response.data.length === 0);
      // Lặp qua các sản phẩm trong giỏ hàng để lấy hình ảnh của từng sản phẩm
      const updatedCartItems = await Promise.all(
        response.data.map(async item => {
          const productResponse = await axios.get(`http://feisty-beauty-production.up.railway.app/api/imgProducts/${item.product.id}`);
          const imageUrl = productResponse.data[0].imgPath;
          return { ...item, imageUrl };
        })
      );
      setCartItems(updatedCartItems);
      // Tính tổng giá trị trong giỏ hàng
      const total = updatedCartItems.reduce((acc, item) => {
        const salePrice = item.product.price - (item.product.price * (item.product.percentDiscount/100));
        return acc + (salePrice * item.quantity);
      }, 0);
      setTotalPrice(total);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const { fetchCartItemsCount } = useCart();

  const deleteCartItem = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/cart/clear/${productId}/${userData.id}`);
      if (response.status === 200) {
        console.log('Sản phẩm đã được xóa khỏi giỏ hàng');
        // Cập nhật lại giỏ hàng sau khi xóa sản phẩm
        fetchCartItems();
        fetchCartItemsCount();
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };


  const updateCartItemQuantity = async (productId, newQuantity, quantity) => {
    if (quantity < 2) {
      console.log('Số lượng sản phẩm không thể nhỏ hơn 0');
      return;
    }

    try {
      const response = await axios.post(`http://feisty-beauty-production.up.railway.app/api/cart/add`, {
        user: {
          id: userData.id
        },
        product: {
          id: productId
        },
        quantity: newQuantity

      });

      if (response.status === 200) {
        console.log('Số lượng sản phẩm đã được cập nhật');
        fetchCartItems();
        fetchCartItemsCount();
      }
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  useEffect(() => {


    fetchCartItems();
  }, []);


  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {showMessage && <p>{cartItems.length === 0 ? 'Your cart is empty' : 'Please log in to view your cart'}</p>}


            {cartItems.map((item) => {
              const salePrice = item.product.price - (item.product.price * (item.product.percentDiscount/100));
              const productQty = salePrice * item.quantity;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img style={{ width: '100%', height: '150px', objectFit: 'cover' }} src={item.imageUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.product.productName}</h3>
                          <h4>
                            {numeral(salePrice).format('0,0')}đ * {item.quantity}
                            <span>{numeral(productQty).format('0,0')}đ</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() => updateCartItemQuantity(item.product.id, 1)}

                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={() => updateCartItemQuantity(item.product.id, -1, item.quantity)}

                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => deleteCartItem(item.product.id)}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Tổng giá trị giỏ hàng</h2>
              <div className=" d_flex">
                <h4>Tổng giá :</h4>
                <h3>{numeral(totalPrice).format('0,0')}đ</h3>


              </div>
            </div>

            <div className="mt-2 text-end" >
              <Button variant="primary" style={{ fontSize: '25px', fontWeight: 'bold', backgroundColor: '#9BCF53', border: '1px solid #9BCF53' }}
                onClick={() => navigate('/checkout')}>Thanh toán</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
