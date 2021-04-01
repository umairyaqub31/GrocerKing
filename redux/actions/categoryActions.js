import axios from 'axios';

export const getCategories = () => async (dispatch, getState) => {
  dispatch({
    type: 'CATEGORY_LOADING',
  });
  const config = {
    headers: {
      'Content-type': 'Application/json',
    },
  };
  try {
    const res = await axios.get(
      'https://us-central1-grocery-king-302815.cloudfunctions.net/api/categories',
      config,
    );
    // console.log('res', res.data);
    dispatch({
      type: 'GET_CATEGORY',
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
