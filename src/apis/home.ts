import request from '@/utils/request';
import { RequestFunc, RequestConfig } from '@/utils/commonTypes';
import { PageListObject } from '@/store/actions/pages';
export interface HomeInfoObject {
  articleCount: number;
  categoryCount: number;
  tagCount: number;
  viewsCount: string;
  pageList: PageListObject;
}

export interface PageListResponse {
  homeInfo: HomeInfoObject;
}

export const pageListRequest: RequestFunc<never, PageListResponse> = (
  config: RequestConfig<never>
): Promise<PageListResponse> => {
  return request(config);
};
