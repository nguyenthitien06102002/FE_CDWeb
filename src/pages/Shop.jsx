import React, { useState, useEffect, Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from 'axios';
import Banner from "../components/Banner/Banner";
import FilterSelect from "../components/FilterSelect/FilterSelect";
import ShopList from "../components/ShopList";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import SearchBar from "../components/SeachBar/SearchBar";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);
  const [filterProducts, setFilteredProducts] = useState([]);
  const [noResults, setNoResults] = useState(true);
  useWindowScrollToTop();

  useEffect(() => {
    const handleWindowResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://feisty-beauty-production.up.railway.app/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchProducts();

    const fetchCategory = async () => {
      try {
        const response = await axios.get('http://feisty-beauty-production.up.railway.app/api/category');
        setCategory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
  }, []);

useEffect(() => {
  const fetchProductsByCategory = async () => {
    try {
      if (selectedCategoryId !== null) {
        const response = await axios.get(`http://feisty-beauty-production.up.railway.app/api/products/category/${selectedCategoryId}`);
        const products = response.data;
        if (products.length === 0) {
          setNoResults(true); // Không có sản phẩm, hiển thị thông báo
          setFilteredProducts([]); // Đặt danh sách sản phẩm đã lọc thành rỗng
        } else {
          // Duyệt qua từng sản phẩm và gọi API để lấy ảnh
          const productsWithImages = await Promise.all(products.map(async (product) => {
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
          setFilteredProducts(productsWithImages);
          setNoResults(false); // Có sản phẩm, không hiển thị thông báo
        }
      }else {
        // Nếu không có danh mục được chọn, đặt danh sách sản phẩm đã lọc về rỗng
        setFilteredProducts([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchProductsByCategory();
}, [selectedCategoryId, setFilteredProducts,setNoResults]);

  

  const handleFilterList = (searchProducts) => {
    setSearchProducts(searchProducts);
    setNoResults(searchProducts.length === 0);
  };

  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id);
  };
  const handleClearFilter = () => {
    setSelectedCategoryId(null); // Xóa bộ lọc danh mục trong Shop
  };

  return (
    <Fragment>
      <Banner title="Sản phẩm" />
      
      <section className="filter-bar">
        <Container>
          <Row className="justify-content-center my-4">
            <Col>
              <SearchBar setFilterList={handleFilterList} />
            </Col>
          </Row>
          {isSmallScreen ? (
            <>
              <Row className="justify-content-center">
                <Col>
                  <div>
                    <FilterSelect categorys={category} onSelectCategory={handleSelectCategory} onClearFilter={handleClearFilter} />
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col>
                  <div style={{ textAlign: "center" }}>
                    {noResults && ( // Kiểm tra nếu không có kết quả tìm kiếm
                      <p style={{marginTop:100}}><strong>Không tìm thấy sản phẩm</strong></p>
                    )}
                    {!noResults && (
                      <ShopList productItems={(searchProducts.length > 0 && filterProducts.length === 0) ? searchProducts : filterProducts.length > 0 ? filterProducts : products} />
                    )}
                  </div>
                </Col>
              </Row>
            </>
          ) : (
            <Row className="justify-content-center">
              <Col md={3}>
                <div>
                  <FilterSelect categorys={category} onSelectCategory={handleSelectCategory} onClearFilter={handleClearFilter}/>
                </div>
              </Col>
              <Col md={9}>
                <div style={{ textAlign: "center" }}>
                  {noResults && ( // Kiểm tra nếu không có kết quả tìm kiếm
                    <p><strong>Không tìm thấy sản phẩm</strong></p>
                  )}
                  {!noResults && (
                    <ShopList productItems={(searchProducts.length > 0 && filterProducts.length === 0) ? searchProducts : filterProducts.length > 0 ? filterProducts : products} />
                  )}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
