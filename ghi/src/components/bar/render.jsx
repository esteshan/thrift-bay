import React from "react";
import styled from "styled-components";

const ProductContainer = styled.div`
  width: 100%;
  min-height: 6em;
  display: flex;
  border-bottom: 2px solid #d8d8d852;
  padding: 6px 8px;
  align-items: center;
`;

const Thumbnail = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex: 0.4;

  img {
    width: 80px;
    height: 80px;
  }
`;

const Name = styled.h3`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;


function ProductRender(props) {
  const { thumbnailSrc, name, onClick } = props;

  return (
    <ProductContainer onClick={onClick}>
      <Thumbnail>
        <img src={thumbnailSrc} alt="nothing to display" />
      </Thumbnail>
      <Name>{name}</Name>
    </ProductContainer>
  );
}


export default ProductRender;
