import React, { Fragment } from 'react';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import Breadcrumbs from '../../Component/Breadcrumbs/Breadcrumbs';
import ImageSlide from './ImageSlide/ImageSlide';
import QuantityController from '../../Component/QuantityController/QuantityController';
import { BASE_URL } from '../../config';
import './Product.scss';

class Product extends React.Component {
  constructor() {
    super();

    this.state = {
      productInfo: {},
      selectedProducts: [],
      selectedTabItemNo: 0,
      isLike: false,
    };
  }
  componentDidMount() {
    //fetch('/data/ProductInfoData.json')
    fetch(`${BASE_URL}/product/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          productInfo: data.result,
        });
      });
  }

  // 수량 변경 Event
  onChangeQuantity = (size, operation, isOverwrite) => {
    const { selectedProducts } = this.state;

    this.setState({
      selectedProducts: selectedProducts.map(product => {
        return product.size !== size
          ? product
          : {
              ...product,
              stock: isOverwrite
                ? parseInt(operation)
                : parseInt(product.stock + operation),
            };
      }),
    });
  };

  // 옵션 상품 선택 Event
  onSelectOptionItem = e => {
    const { options } = e.target;
    let value = options[options.selectedIndex].value;

    // 선택전일 경우에는 아무 동작 안함
    if (options.selectedIndex === 0) return;

    // 품절일 경우
    if (!value) {
      alert('품절된 상품입니다!');
      return;
    }

    // 이미 추가된 옵션일 경우
    if (
      this.state.selectedProducts.filter(product =>
        product.size === value ? product : null
      ).length > 0
    ) {
      alert('이미 추가된 옵션이 있습니다.');
      return;
    }

    this.setState({
      selectedProducts: [
        ...this.state.selectedProducts,
        {
          no: this.state.productInfo.product_id,
          name: this.state.productInfo.product_name,
          stock: 1,
          price: this.state.productInfo.product_price,
          size: value,
        },
      ],
    });
  };

  // 옵션 상품 삭제 Event
  onDeleteOptionItem = size => {
    this.setState({
      selectedProducts: this.state.selectedProducts?.filter(product => {
        if (product.size !== size) {
          return product;
        }
        return null;
      }),
    });
  };

  // 탭 변경 Event
  onSelectTabItemNo = selectedTabItemNo => {
    this.setState({ selectedTabItemNo });
  };

  onToggleLike = () => {
    this.setState({ isLike: !this.state.isLike });
  };

  render() {
    const {
      product_name,
      product_price,
      product_mat,
      product_size,
      product_image,
      product_body,
    } = this.state.productInfo;
    const { selectedProducts, selectedTabItemNo, isLike } = this.state;

    return (
      <>
        <Header />
        <div className="product">
          <main className="productContainer">
            <div className="productDetail">
              <div className="breadcrumbsWrapper">
                {/* TODO: 상품 상세 경로 추후 구현필요 */}
                <Breadcrumbs
                  paths={[
                    {
                      name: 'BAG',
                      url: '/category/2',
                      id: 1,
                    },
                    {
                      name: '백팩',
                      url: '/category/2?sub=6',
                      id: 2,
                    },
                  ]}
                />
              </div>
              <div className="productImage">
                <ImageSlide images={product_image} />
              </div>
              <div className="productDescription">
                <h2 className="name">{product_name}</h2>
                <dl className="descTable">
                  <dt className="red">판매가</dt>
                  <dd className="red">{product_price?.toLocaleString()}원</dd>
                  <dt>상품소재</dt>
                  <dd>{product_mat}</dd>
                  <dt>사이즈</dt>
                  <dd>
                    <select
                      class="selectOption"
                      onChange={e => {
                        this.onSelectOptionItem(e);
                      }}
                    >
                      <option>- [필수] 옵션을 선택해 주세요 -</option>
                      {product_size?.map(size => (
                        <option
                          key={size.option_id}
                          value={
                            size.option_stock === 0 ? '' : size.option_name
                          }
                        >
                          {size.option_name}
                          {size.option_stock === 0 && ' [품절]'}
                        </option>
                      ))}
                    </select>
                  </dd>
                </dl>
                <hr />
                {selectedProducts.length > 0 && (
                  <>
                    <dl className="selectedProducts">
                      {selectedProducts?.map(product => (
                        <Fragment key={product.size}>
                          <dd>
                            {product.name}-{product.size}
                          </dd>
                          <dd className="gridQuanControl">
                            <QuantityController
                              quantityNumber={product.stock}
                              plus={() =>
                                this.onChangeQuantity(product.size, 1, false)
                              }
                              minus={() =>
                                this.onChangeQuantity(product.size, -1, false)
                              }
                              insert={num =>
                                this.onChangeQuantity(product.size, num, true)
                              }
                            />
                            <button
                              className="delete"
                              onClick={() =>
                                this.onDeleteOptionItem(product.size)
                              }
                            >
                              <i class="far fa-times-circle"></i>
                            </button>
                          </dd>
                          <dd className="gridPrice">
                            {(product.price * product.stock).toLocaleString()}원
                          </dd>
                        </Fragment>
                      ))}
                    </dl>
                  </>
                )}
                <dl className="descTable">
                  <dt>
                    <strong>총 상품금액(수량)</strong>
                  </dt>
                  <dd className="price">
                    <span className="totalPrice">
                      {selectedProducts
                        ?.reduce((acc, cur) => acc + cur.price * cur.stock, 0)
                        .toLocaleString()}
                      원
                    </span>
                    <span className="totalQuantity">
                      (
                      {selectedProducts
                        ?.reduce((acc, cur) => acc + cur.stock, 0)
                        .toLocaleString()}
                      개)
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dd className="btnArea">
                    <button className="productButton order">바로구매</button>
                    <button className="productButton">장바구니</button>
                    <button
                      className={`productButton${isLike ? ' isLike' : ''} `}
                      onClick={this.onToggleLike}
                    >
                      <i className="far fa-heart "></i>
                    </button>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="additionalTabs">
              <ul className="linkHorizontal">
                {ADDITIONAL_TABS_ITEMS.map((item, no) => {
                  return (
                    <li
                      className={`tabItem${
                        selectedTabItemNo === no ? ' active' : ''
                      }`}
                      onClick={() => this.onSelectTabItemNo(no)}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="productAdditional">
              {/* 첫번째 탭 */}
              <div
                className={`tabWrap${
                  selectedTabItemNo === 0 ? ' visibled' : ''
                }`}
              >
                <img
                  alt="SPECIAL GIFT 15만원 이상 구매시 공골 캠핑 매트 증정!"
                  src="https://i.imgur.com/jJMFXFZ.png"
                />

                <img
                  alt={`${product_name}의 상품 상세 소개 이미지입니다.`}
                  src={product_body}
                  className="itemDetailImg"
                />
              </div>

              {/* 두번째 탭 */}
              <div
                className={`tabWrap${
                  selectedTabItemNo === 1 ? ' visibled' : ''
                }`}
              >
                <div>
                  <img
                    alt="상품 Info 관련 이미지"
                    src="https://kangolkorea.com/web/upload/NNEditor/20210104/1388_BK_detail_info.jpg"
                    className="desc"
                  />
                </div>
              </div>

              {/* 세번째 탭 */}
              <div
                className={`tabWrap${
                  selectedTabItemNo === 2 ? ' visibled' : ''
                }`}
              >
                <div>
                  <img
                    alt="상품 Size 관련 이미지"
                    src="https://kangolkorea.com/web/upload/NNEditor/20210316/1395_BK_detail_size.jpg"
                    className="desc"
                  />
                </div>
              </div>

              {/* 네번째 탭 */}
              <div
                className={`tabWrap${
                  selectedTabItemNo === 3 ? ' visibled' : ''
                }`}
              >
                <div className="customerService">
                  <h1>배송안내 </h1>
                  <ul>
                    <li>
                      <h2>배송기간</h2>
                      <div>
                        <p>- 주문완료 후 3 ~ 7일 이내 택배로 배송됩니다.</p>
                      </div>
                    </li>
                    <li>
                      <h2>배송비</h2>
                      <div>
                        <p>
                          - 3만원 이상의 상품은 무료배송이며 3만원 이하의 상품은
                          2,500원의 택배비가 부과됩니다.
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2>배송문의</h2>
                      <div>
                        <p>
                          - <span>공골코리아 온라인 고객센터 : 1234-1004</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                  <h1>교환 및 반품</h1>
                  <ul>
                    <li>
                      <h2>교환/반품 배송비</h2>
                      <div>
                        <p>
                          - 고객님의 단순변심으로 인해 교환/반품을 하실 경우에는
                          왕복 택배비 5,000원을 부담하셔야 합니다.
                        </p>
                        <p>
                          - 제품의 하자로 인해 반품/교환을 하실 경우에 택배비는
                          무료입니다.
                        </p>
                      </div>
                      <div></div>
                    </li>
                    <li>
                      <h2>교환/반품 주소지</h2>
                      <div>
                        <p>
                          <span>
                            - 서울 특별시 강남구 테헤란로 427 위워크타워 10층
                          </span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2>교환/반품 불가사유</h2>
                      <div>
                        <p>
                          - 고객님의 단순변심(사이즈 부정확, 디자인
                          색상불만등)으로 인한 교환/반품은 상품을
                          수령하신날로부터 10일 이내에 가능합니다.
                        </p>
                        <p>
                          - 온라인에서 구매하신 제품은 오프라인 매장에서 교환 및
                          반품이 불가능합니다.
                        </p>
                        <p>
                          - 포장의 오리지날 택을 제거하였을 경우 교환/반품이
                          불가하오니 이 점 양해하여 주시기 바랍니다.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <h1>품질 보증 및 A/S</h1>
                  <ul>
                    <li>
                      <h2>보증기간</h2>
                      <div>
                        <p>- 품질 보증 기간은 제품 구입일로부터 1년입니다. </p>
                      </div>
                    </li>
                    <li>
                      <h2>문의처</h2>
                      <div>
                        <p>
                          - A/S 관련문의는 공골 정식 수입판매처인 (주) 위코드에
                          문의바랍니다.
                        </p>
                        <p>
                          - <span>품질 보증 문의처 : 1234-1004</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                  <h1>취급주의사항</h1>
                  <ul>
                    <li>
                      <h2>제품취급주의사항</h2>
                      <div>
                        <p>- 가방,모자류는 세탁기로 세탁하지 마십시오.</p>
                        <p>
                          - 가방,모자류의 오염물질 제거시는찬물을 적신 천을
                          이용하여 닦아 주십시오. (제품에 따라 물접촉이 안될 수
                          있습니다.)
                        </p>
                        <p>
                          - 모자의 경우 땀으로 인해 부분 탈색 가능성이 있으니
                          땀에 젖었을 경우에는 그늘에서 충분히 말린후 보관해
                          주십시오.
                        </p>
                        <p>
                          - 가방 및 모자는 드라이 클리닝, 다림질을 하지
                          마십시오.
                        </p>
                        <p>
                          - 사용전 취급주의사항은 제품에 부착되어 있는
                          케어라벨을 확인해 주십시오.{' '}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }
}

// 상품 상세 탭 아이템
const ADDITIONAL_TABS_ITEMS = [
  '제품정보',
  '상품정보고시',
  '사이즈표',
  '배송안내',
];

export default Product;
