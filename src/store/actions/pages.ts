import { UPDATE_PAGES } from '../types/pages';

export interface UpdatePagesAction {
  type: string;
  pageList: PageListObject;
}

export interface PageItemObject {
  pageId: number;
  pageName: string;
  pageDescription: string;
  pageCover: string;
}

export type PageListObject = PageItemObject[];

export const updatePageList = (pageList: PageListObject): UpdatePagesAction => {
  return {
    type: UPDATE_PAGES,
    pageList,
  };
};
