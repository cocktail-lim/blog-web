import request from '@/utils/request';
import { RequestFunc, RequestConfig } from '@/utils/commonTypes';
import { ArticleListType } from '@/store/actions/home';
import { TagItem } from '@/store/actions/home';

export interface ArticleListParams {
  current: number;
  size: number;
}

export interface ArticleListResponse {
  articleList: ArticleListType;
  total: number;
}

export const articleListRequest: RequestFunc<ArticleListParams, ArticleListResponse> = (
  config: RequestConfig<ArticleListParams>
): Promise<ArticleListResponse> => {
  return request(config);
};

export interface ArticleDetailParams {
  articleId: string;
}
export interface ArticleDetailObject {
  id: number;
  articleTitle: string;
  articleContent: string;
  categoryName: string;
  createTime: string;
  updateTime: string;
  tagList: TagItem[];
  articleCover: string;
}

export interface ArticleDetailResponse {
  articleContent: ArticleDetailObject;
}

export const articleDetailRequest: RequestFunc<ArticleDetailParams, ArticleDetailResponse> = (
  config: RequestConfig<ArticleDetailParams>
): Promise<ArticleDetailResponse> => {
  return request(config);
};
