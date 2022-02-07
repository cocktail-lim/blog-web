import { GET_PAGE_LIST, UPDATE_CURRENT, UPDATE_CURRENT_BASIC } from '@/store/types/home';

export interface TagItem {
  tagId: number;
  tagName: string;
}

export interface PageItem {
  id: number;
  articleTitle: string;
  articleCover: string;
  categoryName: string;
  isTop: boolean;
  createTime: string;
  tagList: TagItem[];
  articlePreviewContent: string;
}

export type PageList = PageItem[];

export const updatePageList = (pageList: PageList) => {
  return {
    type: GET_PAGE_LIST,
    pageList,
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

// export const updateCurrentBasic = () => {

// };
