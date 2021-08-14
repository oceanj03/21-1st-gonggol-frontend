import React from 'react';
import Breadcrumbs from '../../../Component/Breadcrumbs/Breadcrumbs';
import ContentTitle from '../../../Component/ContentTitle/ContentTitle';
import './CategoryHeader.scss';

class CategoryHeader extends React.Component {
  render() {
    const { categoryName, categoryPath, bannerImage, itemCount } = this.props;
    return (
      <div className="categoryHeader">
        <div>
          <img alt={`${categoryName}의 배너 이미지`} src={bannerImage} />
        </div>
        <div className="normalMenu">
          <div>TOTAL PRODUCT: {itemCount}</div>
          <Breadcrumbs paths={categoryPath} />
        </div>
        <ContentTitle>{categoryName}</ContentTitle>
      </div>
    );
  }
}

export default CategoryHeader;
