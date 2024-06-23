import { useState, useEffect } from "react";
import "./searchbar.css";
import axios from 'axios';

const SearchBar = ({ setFilterList }) => {
  const [searchWord, setSearchWord] = useState("");

  const handelChange = (event) => {
    const inputValue = event.target.value;
    setSearchWord(inputValue);
  };

  useEffect(() => {
    const findProducts = async () => {
      try {
        const response = await axios.get(`http://feisty-beauty-production.up.railway.app/api/products/search?productName=${searchWord}`);
        if (!response.data) {
          throw new Error("Failed to fetch product.");
        }
        const filteredProducts = response.data;
  
        // Duyệt qua từng sản phẩm và gọi API để lấy ảnh
        const productsWithImages = await Promise.all(filteredProducts.map(async (product) => {
          try {
            const imageResponse = await axios.get(`http://feisty-beauty-production.up.railway.app/api/imgProducts/${product.id}`);
            const imageUrl = imageResponse.data[0].imgPath;
            // Thêm thông tin ảnh vào mỗi sản phẩm
            return { ...product, imageUrl };
          } catch (error) {
            console.error("Error fetching image for product:", product.id, error);
            // Nếu không thể lấy được ảnh, trả về sản phẩm không có ảnh
            return { ...product, imageUrl: null };
          }
        }));
  
        // Cập nhật danh sách sản phẩm đã được lọc và có thông tin ảnh
        setFilterList(productsWithImages);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
  
    findProducts();
  }, [searchWord, setFilterList]);
  

  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." onChange={handelChange} />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
