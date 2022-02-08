import React, { useState, useCallback, Fragment, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Row, Col, message } from 'antd';
import { pageListRequest, PageListResponse } from '@/apis/home';
import ArticleList from '@/components/articleList';
import { RequestConfig } from '@/utils/commonTypes';
import { RequestError } from '@/utils/request';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { createSelector } from 'reselect';
import { PageListObject, updatePageList } from '@/store/actions/pages';
import './index.scss';
import { RootState } from '@/store/store';
import { find } from 'lodash';

const initialBannerState: React.CSSProperties = {
  backgroundImage: 'url()',
};
const Home: React.FC = () => {
  const [bannerStyle, setBannerStyle] = useState<React.CSSProperties>(initialBannerState);
  const dispatch = useAppDispatch();
  const homePage = useAppSelector(
    createSelector(
      (state: RootState) => state.pageList,
      (pageList: PageListObject) => find(pageList, (item) => item.pageId === 1)
    )
  );

  useEffect(() => {
    async function getPageList() {
      const config: RequestConfig<never> = {
        api: '/api/home',
        method: 'get',
      };
      try {
        const response: PageListResponse = await pageListRequest(config);
        const { homeInfo } = response;
        const { pageList } = homeInfo;
        dispatch(updatePageList(pageList));
      } catch (e) {
        const err: RequestError = e as RequestError;
        message.error(err.message);
      }
    }
    getPageList();
  }, []);

  useEffect(() => {
    setBannerStyle({ backgroundImage: `url(${homePage?.pageCover})` });
  }, [homePage]);

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
            <div className='article-list-container'>
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
