import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.scss';

class ProductList extends React.Component {
  componentDidUpdate() {
    //TODO: 상품 목록 업데이트 될 때마다 애니메이션 추가
    //
    //('fading 2s infinite');
    // if (this.props.reloadProductList) {
    //   document.querySelector('.productList').style = 'animation: fadein 2s';
    // }
  }

  render() {
    const { products } = this.props;

    return (
      <div className="productList">
        {products?.map(product => (
          <div className="productDetail" key={products.product_id}>
            <Link to={`/product/${product.product_id}`}>
              <div className="productThumbnail">
                {product?.product_image[1] && (
                  <img
                    alt={`${product.product_name}의 마우스오버 이미지`}
                    src={product?.product_image[1]}
                    class="productImage hoverImage"
                  />
                )}
                <img
                  className="productImage"
                  alt={`${product.product_name}의 이미지`}
                  src={product?.product_image[0]}
                />
              </div>
            </Link>
            <div className="description">
              <div className="icon">
                {Array.isArray(product?.product_tag) &&
                  product?.product_tag.hasOwnProperty('new') &&
                  product?.product_tag[0].new && (
                    <span className="new">신상품</span>
                  )}
                {Array.isArray(product?.product_tag) &&
                  product?.product_tag.hasOwnProperty('sale') &&
                  product?.product_tag[0].sale && (
                    <span className="sale">세일</span>
                  )}
                {Array.isArray(product?.product_tag) &&
                  product?.product_tag.hasOwnProperty('best') &&
                  product?.product_tag[0].best && (
                    <span className="best">베스트</span>
                  )}
              </div>
              <div className="name">
                <Link to={`/product/${product.product_id}`}>
                  {product.product_name}
                </Link>
              </div>
              <div className="spec">
                {product.discount_rate < 1 && (
                  <div className="originalPrice">
                    {product.product_price.toLocaleString()}원
                  </div>
                )}
                <div className="salesPrice">
                  {(
                    product.product_price *
                    (product.discount_rate ? product.discount_rate : 1)
                  ).toLocaleString()}
                  원
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductList;
