import React from 'react';
import './SubCategory.scss';

class SubCategory extends React.Component {
  render() {
    const {
      subCategories,
      currentCategory,
      onChangeSubCategory,
      onChangeFilter,
    } = this.props;
    return (
      <div className="subCategory">
        <ul className="subCategoryNav">
          {subCategories?.map(category => (
            <li key={category.category_no}>
              <div
                onClick={() => onChangeSubCategory(category.category_no)}
                className={`title
                  ${category.category_no === currentCategory ? ' selected' : ''}
                `}
              >
                {category.category_name}
              </div>
            </li>
          ))}
        </ul>
        <div className="productFilter">
          <select onChange={onChangeFilter}>
            <option value="">정렬방식</option>
            <option value="-created_at">신상품</option>
            <option value="name">상품명</option>
            <option value="price">낮은 가격순</option>
            <option value="-price">높은 가격순</option>
          </select>
        </div>
      </div>
    );
  }
}

export default SubCategory;
