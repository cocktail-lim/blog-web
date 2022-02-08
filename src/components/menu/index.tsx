import React, { useEffect } from 'react';
import { RequestConfig } from '@/utils/commonTypes';
import { pageListRequest, PageListResponse } from '@/apis/home';
import { useAppDispatch } from '@/hooks/redux';
import { updatePageList } from '@/store/actions/pages';
import { RequestError } from '@/utils/request';
import { message } from 'antd';

const Menu: React.FC = () => {
  const dispatch = useAppDispatch();

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
  return (
    <ul>
      <li>首页</li>
    </ul>
  );
};

export default Menu;
