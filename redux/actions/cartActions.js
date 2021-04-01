import axios from 'axios';

export const addToCart = (product, quantity) => async (dispatch, getState) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: product,
    quantity: quantity,
  });
};

export const updateQuantity = (quantity, id) => async (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_QUANTITY',
    id: id,
    quantity: quantity,
  });
};

export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: 'REMOVE_FROM_CART',
    id: id,
  });
};

export const checkOutAction = (
  cart,
  user_id,
  user_phoneNo,
  lat,
  lng,
  address,
  voucher,
  total,
  scheduleType,
) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-type': 'Application/json',
    },
  };

  const body = {
    cart,
    user_id,
    user_phoneNo,
    lat,
    lng,
    address,
    voucher,
    total,
    scheduleType,
  };
  console.log(body);

  try {
    const res = await axios.post(
      'https://us-central1-grocery-king-302815.cloudfunctions.net/api/orders',
      body,
      config,
    );
    console.log('res', res.data);
  } catch (err) {
    console.log(err);
  }
};

export const verifyVoucher = (cart, code) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-type': 'Application/json',
    },
  };

  const body = {
    cart,
    code,
  };

  try {
    const res = await axios.post(
      'https://us-central1-grocery-king-302815.cloudfunctions.net/api/vouchers/checkVoucher',
      body,
      config,
    );
    console.log('res', res);
  } catch (err) {
    console.log(err);
  }
};
