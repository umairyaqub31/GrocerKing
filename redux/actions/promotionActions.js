import axios from 'axios';

export const getPromotions = () => async (dispatch, getState) => {
  dispatch({
    type: 'PROMOTIONS_LOADING',
  });
  const config = {
    headers: {
      'Content-type': 'Application/json',
    },
  };
  try {
    const res = await axios.get(
      'https://us-central1-grocery-king-302815.cloudfunctions.net/api/promotions',
      config,
    );
    console.log('res', res.data);
    dispatch({
      type: 'GET_PROMOTIONS',
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};


export const addPromotion = (promotion) => async (dispatch, getState) => {
    dispatch({
      type : 'ADD_PROMOTION',
      payload : promotion
    });
};

export const emptyPromotions = (promotion) => async (dispatch, getState) => {
  dispatch({
    type : 'EMPTY_PROMOTIONS',
  });
};

