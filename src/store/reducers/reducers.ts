import { combineReducers } from 'redux';
import { pageList, homeCurrent } from './home';

export default function createReducer() {
  return combineReducers({
    pageList,
    homeCurrent,
  });
}
