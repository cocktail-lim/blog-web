import { combineReducers } from 'redux';
import { pageList } from './home';

export default function createReducer() {
  return combineReducers({
    pageList,
  });
}
