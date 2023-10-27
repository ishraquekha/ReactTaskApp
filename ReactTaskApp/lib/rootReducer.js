import { combineReducers } from 'redux'
import { postReducer } from './reducer';

export const rootReducer = combineReducers({
  post: postReducer
});