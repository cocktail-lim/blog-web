import request from '@/utils/request';
import { RequestFunc, RequestConfig } from '@/utils/commonTypes';

export interface PageItemObject {
  pageId: number;
  pageName: string;
  pageDescription: string;
  pageCover: string;
}

export type PageListObject = PageItemObject[];

export interface PageListResponse {
  articleCount: number;
  categoryCount: number;
  tagCount: number;
  viewsCount: string;
  pageList: PageListObject;
}

export const pageListRequest: RequestFunc<never, PageListResponse> = (
  config: RequestConfig<never>
): Promise<PageListResponse> => {
  return request(config);
};
