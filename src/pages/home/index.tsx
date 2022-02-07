import React, { useState, useCallback, Fragment, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

import ArticleList from '@/components/articleList';

import './index.scss';

const initialBannerState: React.CSSProperties = {
  backgroundImage:
    'url(https://myblog-1307358696.cos.ap-hongkong.myqcloud.com/%E5%8D%9A%E5%AE%A2%E5%B0%81%E9%9D%A2%E5%9B%BE/759fd1c9ef419fcd72618424d5d680b2.jpg)',
};
const Home: React.FC = () => {
  const [bannerStyle, setBannerStyle] = useState<React.CSSProperties>(initialBannerState);

  return (
    <Fragment>
      <div className='home-banner' style={bannerStyle}>
        <div className='scroll-box'>
          <DownOutlined className='down-icon' />
        </div>
      </div>
      <div className='home-container'>
        <Row>
          <Col span={16}>
            <div className='page-list-container'>
              <ArticleList />
            </div>
          </Col>
          <Col span={8}>
            <div className='author-profile'></div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Home;
