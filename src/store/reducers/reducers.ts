import { combineReducers } from 'redux';
import { articleList, homeCurrent, pageList } from './home';

export default function createReducer() {
  return combineReducers({
    articleList,
    homeCurrent,
    pageList,
  });
}
