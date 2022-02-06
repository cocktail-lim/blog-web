import request from '@/utils/request';
import { RequestFunc, RequestConfig } from '@/utils/commonTypes';
import { PageList } from '@/store/actions/home';

export interface PageListParams {
  current: number;
  size: number;
}

export interface PageListResponse {
  articleList: PageList;
  total: number;
}

export const pageListRequest: RequestFunc<PageListParams, PageListResponse> = (
  config: RequestConfig<PageListParams>
): Promise<PageListResponse> => {
  return request(config);
};
