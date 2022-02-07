import request from '@/utils/request';
import { RequestFunc, RequestConfig } from '@/utils/commonTypes';
import { ArticleListType } from '@/store/actions/home';

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
