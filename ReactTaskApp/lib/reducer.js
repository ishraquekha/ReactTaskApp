import { createReducer } from '@reduxjs/toolkit';
import {
  getPostAction,
  createPostAction,
  resetCreatePostAction
} from "./action";

export const postReducer = createReducer({}, (builder) => {
  builder
    .addCase(getPostAction, (state, action) => {
      state.getPostStatus = true;
      state.getPostResponse = action.payload;
    })
    .addCase(createPostAction, (state, action) => {
      state.createPostStatus = true;
      state.createPostResponse = action.payload;
    })
    .addCase(resetCreatePostAction, (state) => {
      state.createPostStatus = undefined;
      state.createPostResponse = undefined;
    })
    .addDefaultCase((state) => state);
});