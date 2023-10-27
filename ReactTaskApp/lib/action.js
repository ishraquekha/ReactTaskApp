import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
export const getPostAction = createAction("GET_POST");
export const createPostAction = createAction("CREATE_POST");
export const resetCreatePostAction = createAction("RESET_CREATE_POST");


export const getpostAsync = () => {
  return (dispatch) => {
    axios.get(`http://localhost:4000/api/v1/posts?_sort=createdAt&_order=desc`)
      .then((response) => {
        if (response) {
          dispatch(getPostAction(response));
        }
      })
      .catch((reason) => {
        dispatch(getPostAction(reason.response));
      });
  };
};

export const createPostAsync = (data) => {
  return (dispatch) => {
    axios.post(`http://localhost:4000/api/v1/posts`,data)
      .then((response) => {
        if (response) {
          dispatch(createPostAction(response));
        }
      })
      .catch((reason) => {
        dispatch(createPostAction(reason.response));
      });
  };
};

export const resetCreatePostAsync = () => {
  return (dispatch) => {
    dispatch(resetCreatePostAction());
  };
};