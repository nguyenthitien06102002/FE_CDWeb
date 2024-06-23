import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Featurs from "../components/Featurs/Featurs";
import Project from "../components/Project/Project";
import axios from 'axios';
import { useEffect, useState } from "react";

const Home = () => {
  // const newArrivalData = products.filter(
  //   (item) => item.category === "mobile" || item.category === "wireless"
  // );
  // const bestSales = products.filter((item) => item.category === "sofa");
  // useWindowScrollToTop();
  const [products, setProducts] = useState([]);
  const [discounted, setDiscounted] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://feisty-beauty-production.up.railway.app/api/products');
        const productsWithImages = await Promise.all(response.data.map(async (product) => {
          const imageResponse = await axios.get(`http://feisty-beauty-production.up.railway.app/api/imgProducts/${product.id}`);
          return { ...product, imageUrl: imageResponse.data[0].imgPath };
        }));
        // setProducts(productsWithImages);
        // console.log(productsWithImages);
        // Sắp xếp sản phẩm theo thời gian tạo, sản phẩm mới nhất ở đầu danh sách
        const sortedProducts = productsWithImages.sort((a, b) => {
          return new Date(b.createDate) - new Date(a.createDate);
        });

        // Lấy 6 sản phẩm đầu tiên
        const newProducts = sortedProducts.slice(0, 6);
        setProducts(newProducts);
        // console.log(newProducts);
        // Lọc ra những sản phẩm đang giảm giá và lấy 6 sản phẩm đầu tiên
        const discountedProducts = sortedProducts.filter(product => product.percentDiscount > 0);
        const newDiscountedProducts = discountedProducts.slice(0, 6);
        setDiscounted(newDiscountedProducts);
        console.log(newDiscountedProducts);

      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();


  }, []);

  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Sản phẩm giảm giá"
        bgColor="#f6f9fc"
        productItems={discounted}
      />
      <Featurs />
      <Section
        title="Sản phẩm mới"
        bgColor="white"
        productItems={products}
      />
      {/* <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} /> */}
      <Project />
    </Fragment>
  );
};

export default Home;
