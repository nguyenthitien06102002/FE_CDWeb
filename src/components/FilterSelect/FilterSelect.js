import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { products } from '../../utils/products';
import "./filterSelect.css";
import { RiTreeFill } from "react-icons/ri";
import { IoFilterCircle } from "react-icons/io5";
import numeral from 'numeral';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FaMoneyBillAlt } from "react-icons/fa";

const FilterSelect = ({ categorys, onSelectCategory,onClearFilter  }) => {

  const [showCategories, setShowCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null); // State để theo dõi category được chọn
  const [priceRange, setLocalPriceRange] = useState([0, 5000000]);

  const handlePriceChange = (value) => {
    setLocalPriceRange(value);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowCategories(window.innerWidth >= 1000);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const formatPrice = (price) => {
    return numeral(price).format('0,0');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id); // Cập nhật category được chọn
    if (onSelectCategory) {
      onSelectCategory(category.id);
    }
  };

  const clearFilter = () => {
    setSelectedCategory(null); // Xóa bộ lọc danh mục
    if (onClearFilter) {
      onClearFilter(); // Thông báo khi nút "Xóa lọc" được nhấn
    }
  };
  

  return (
    <div className="mb-3 mt-4">
      {showCategories ? (
        <>
          <h4 className="mb-4"><IoFilterCircle style={{ marginRight: '10px', cursor: 'pointer' }} onClick={toggleCategories} />Danh mục sản phẩm</h4>
          <ul className="list-unstyled fruite-categorie">
            {categorys && categorys.map((category) => (
              <li key={category.id}>
                <div className={`d-flex justify-content-between fruite-name ${selectedCategory === category.id ? 'selected' : ''}`}>
                  <a className="style-name mt-2 mp-2" onClick={() => handleCategorySelect(category)}>
                    <RiTreeFill style={{ marginRight: '10px' }} />{category.name}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <div className="mt-4">
              <h4><FaMoneyBillAlt style={{ marginRight: '10px', cursor: 'pointer' }} />Giá</h4>
            </div>
            <div style={{ padding: '15px' }}>
              <p>Giá: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])} đ</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Slider
                  min={0}
                  max={5000000}
                  value={priceRange}
                  onChange={handlePriceChange}
                  range
                  trackStyle={{ backgroundColor: '#9BCF53' }}
                  handleStyle={[{ borderColor: '#9BCF53', backgroundColor: '#416D19' }, { borderColor: '#9BCF53', backgroundColor: '#416D19' }]}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <IoFilterCircle
          style={{ fontSize: '2rem', marginBottom: '1rem', cursor: 'pointer' }}
          onClick={toggleCategories}
        />
      )}
      {selectedCategory && (
        <button style={{backgroundColor:'red',padding:10,borderRadius:10,color:'white'}} onClick={clearFilter}>Xóa lọc</button>
      )}
    </div>
  );
};

export default FilterSelect;
