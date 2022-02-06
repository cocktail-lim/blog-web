import { GET_PAGE_LIST } from '@/store/types/home';
import { PageList } from '@/store/actions/home';
import { unionBy } from 'lodash';

interface PageListAction {
  type: string;
  pageList: PageList;
}

const initialPageListState: PageList = [];

export const pageList = (state: PageList = initialPageListState, action: PageListAction) => {
  switch (action.type) {
    case GET_PAGE_LIST:
      return unionBy(state, action.pageList, 'id');
    default:
      return state;
  }
};
