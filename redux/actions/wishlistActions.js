import axios from 'axios';

const config = {
  headers: {
    'content-type': 'application/json',
  },
};

export const addToWishlist = (product, id) => async (dispatch, getState) => {
  const body = {
    product,
  };

  dispatch({
    type: 'ADD_TO_WISHLIST',
    payload: product,
  });
  const res = await axios.post(
    `https://us-central1-grocery-king-302815.cloudfunctions.net/api/wishlist/${id}`,
    body,
    config,
  );
};

export const removeFromWishlist = (productId, id) => async (
  dispatch,
  getState,
) => {
  console.log('idddd', id);
  const body = {
    productId,
  };

  dispatch({
    type: 'REMOVE_FROM_WISHLIST',
    id: productId,
  });

  const res = await axios.put(
    `https://us-central1-grocery-king-302815.cloudfunctions.net/api/wishlist/${id}`,
    body,
    config,
  );
  console.log(res.data);
};

export const getWishlist = id => async (dispatch, getState) => {
  const res = await axios.get(
    `https://us-central1-grocery-king-302815.cloudfunctions.net/api/wishlist/${id}`,
    config,
  );
  dispatch({
    type: 'GET_WISHLIST',
    payload: res.data,
  });
};

export const emptyWishist = () => (dispatch, getState) => {
  dispatch({
    type: 'EMPTY_WISHIST',
  });
};
