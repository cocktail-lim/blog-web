import { combineReducers } from 'redux';
import { articleList, homeCurrent } from './home';

export default function createReducer() {
  return combineReducers({
    articleList,
    homeCurrent,
  });
}
