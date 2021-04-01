import axios from 'axios';

export const getProducts = () => async (dispatch, getState) => {
  dispatch({
    type: 'PRODUCTS_LOADING',
  });
  const config = {
    headers: {
      'Content-type': 'Application/json',
    },
  };
  try {
    const res = await axios.get(
      'https://us-central1-grocery-king-302815.cloudfunctions.net/api/products',
      config,
    );
    // console.log('res', res.data);
    dispatch({
      type: 'GET_PRODUCTS',
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addProducts = product => (dispatch, getState) => {
  dispatch({
    type: 'ADD_PRODUCTS',
    payload: product,
  });
};

export const updateProducts = product => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_PRODUCTS',
    payload: product,
  });
};
