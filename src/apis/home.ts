import request from '@/utils/request';
import { RequestFunc, RequestConfig } from '@/utils/commonTypes';

export interface PageItemObject {
  pageId: number;
  pageName: string;
  pageDescription: string;
  pageCover: string;
}

export type PageListObject = PageItemObject[];

export interface HomeResponse {
  articleCount: number;
  categoryCount: number;
  tagCount: number;
  viewsCount: string;
  pageList: PageListObject;
}
