import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const CartContext = createContext();

// Tạo một custom hook để sử dụng context
export const useCart = () => {
  return useContext(CartContext);
};

// Tạo một Provider component để cung cấp giá trị cho tất cả các component con
export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
    const fetchCartItemsCount = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData || !userData.id) {
        return;
      }

      try {
        const response = await axios.get(`http://feisty-beauty-production.up.railway.app/api/cart/items/${userData.id}`);
        // Tính tổng số lượng sản phẩm trong giỏ hàng
        const itemCount = response.data.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(itemCount);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
  useEffect(() => {


    fetchCartItemsCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartItemCount, fetchCartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};
