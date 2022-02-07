import { GET_ARTICLE_LIST, UPDATE_CURRENT, UPDATE_CURRENT_BASIC } from '@/store/types/home';

export interface TagItem {
  tagId: number;
  tagName: string;
}

export interface ArticleItem {
  id: number;
  articleTitle: string;
  articleCover: string;
  categoryName: string;
  isTop: boolean;
  createTime: string;
  tagList: TagItem[];
  articlePreviewContent: string;
}

export type ArticleListType = ArticleItem[];

export const updateArticleList = (articleList: ArticleListType) => {
  return {
    type: GET_ARTICLE_LIST,
    articleList,
  };
};

export const updateCurrent = (current?: number) => {
  if (!current) {
    return {
      type: UPDATE_CURRENT_BASIC,
    };
  }
  return {
    type: UPDATE_CURRENT,
    current,
  };
};
