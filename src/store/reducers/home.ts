import { GET_ARTICLE_LIST, UPDATE_CURRENT, UPDATE_CURRENT_BASIC } from '@/store/types/home';
import { UPDATE_PAGES } from '@/store/types/pages';
import { ArticleListType } from '@/store/actions/home';
import { PageListObject, UpdatePagesAction } from '@/store/actions/pages';
import { differenceBy, unionBy } from 'lodash';

interface ArticleListAction {
  type: string;
  articleList: ArticleListType;
}
interface CurrentAction {
  type: string;
  current?: number;
}
const initialArticleListState: ArticleListType = [];

export const articleList = (
  state: ArticleListType = initialArticleListState,
  action: ArticleListAction
) => {
  const newArticles =
    state.length < 1 ? action.articleList : differenceBy(action.articleList, state, 'id');
  switch (action.type) {
    case GET_ARTICLE_LIST:
      return Array.prototype.concat(state, newArticles);
    default:
      return state;
  }
};
export const homeCurrent = (state = 1, action: CurrentAction) => {
  switch (action.type) {
    case UPDATE_CURRENT:
      return action.current || 1;
    case UPDATE_CURRENT_BASIC:
      return state + 1;
    default:
      return state;
  }
};

export const pageList = (state: PageListObject = [], action: UpdatePagesAction) => {
  switch (action.type) {
    case UPDATE_PAGES:
      return unionBy(state, action.pageList, 'pageId');
    default:
      return state;
  }
};
