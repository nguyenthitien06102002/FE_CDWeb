import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  width: 200px;
  margin: 0 auto;
`;

const DropdownHeader = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  cursor: pointer;
`;

const DropdownListContainer = styled.div`
  position: absolute;
  background-color: #ffffff;
  width: 200px;
  border: 1px solid #ddd;
`;

const DropdownListItem = styled.div`
  padding: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ProductCatalog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggling}>
        Danh mục sản phẩm
      </DropdownHeader>
      {isOpen && (
        <DropdownListContainer>
          <DropdownListItem>Sen đá -</DropdownListItem>
          <DropdownListItem>Sen đá vị mini 8k</DropdownListItem>
          <DropdownListItem>Sen đá cỡ nhỏ 15k - 25k</DropdownListItem>
          <DropdownListItem>Sen đá cỡ vừa 50k</DropdownListItem>
          <DropdownListItem>Sen đá cỡ lớn</DropdownListItem>
          <DropdownListItem>Xương rồng</DropdownListItem>
          <DropdownListItem>Chậu đất nung</DropdownListItem>
          <DropdownListItem>Chậu sứ</DropdownListItem>
          <DropdownListItem>Phụ kiện trang trí</DropdownListItem>
          <DropdownListItem>Đất trồng, phân bón</DropdownListItem>
          <DropdownListItem>Sỏi trang trí</DropdownListItem>
          <DropdownListItem>Dụng cụ trồng sen đá</DropdownListItem>
          <DropdownListItem>Tiểu cảnh trang trí</DropdownListItem>
        </DropdownListContainer>
      )}
    </DropdownContainer>
  );
};

export default ProductCatalog;
