import React, { useState, useCallback, Fragment, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Row, Col, message } from 'antd';
import { useAppDispatch } from '@/hooks/redux';
import { updatePageList } from '@/store/actions/home';
import ArticleList from '@/components/articleList';
import { pageListRequest, PageListParams } from '@/apis/article';
import { RequestConfig } from '@/utils/commonTypes';
import './index.scss';
import { RequestError } from '@/utils/request';

const initialBannerState: React.CSSProperties = {
  backgroundImage:
    'url(https://myblog-1307358696.cos.ap-hongkong.myqcloud.com/%E5%8D%9A%E5%AE%A2%E5%B0%81%E9%9D%A2%E5%9B%BE/759fd1c9ef419fcd72618424d5d680b2.jpg)',
};
const Home: React.FC = () => {
  const [bannerStyle, setBannerStyle] = useState<React.CSSProperties>(initialBannerState);
  const [current, setCurrent] = useState<number>(1);
  const dispatch = useAppDispatch();
  const getPageList = useCallback(async () => {
    const config: RequestConfig<PageListParams> = {
      api: '/api/article/listArticlePreviewPage',
      method: 'get',
      params: {
        current,
        size: 10,
      },
    };
    try {
      const response = await pageListRequest(config);
      const { articleList } = response;
      dispatch(updatePageList(articleList));
    } catch (e) {
      const err: RequestError = e as RequestError;
      message.error(err.message);
    }
  }, [current]);

  useEffect(() => {
    getPageList();
  }, [current]);
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
