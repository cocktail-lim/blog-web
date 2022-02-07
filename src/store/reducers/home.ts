import { GET_PAGE_LIST, UPDATE_CURRENT, UPDATE_CURRENT_BASIC } from '@/store/types/home';
import { PageList } from '@/store/actions/home';
import { unionBy, differenceBy } from 'lodash';

interface PageListAction {
  type: string;
  pageList: PageList;
}

interface CurrentAction {
  type: string;
  current?: number;
}

const initialPageListState: PageList = [];

export const pageList = (state: PageList = initialPageListState, action: PageListAction) => {
  const newPages = state.length < 1 ? action.pageList : differenceBy(action.pageList, state, 'id');
  switch (action.type) {
    case GET_PAGE_LIST:
      return Array.prototype.concat(state, newPages);
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
