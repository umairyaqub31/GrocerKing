import axios from 'axios';

export const setLocationAddress = (address, location) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: 'SET_ADDRESS',
    payload: address,
  });

  dispatch({
    type: 'SET_LOCATION',
    payload: location,
  });
};

export const getLocationAddress = id => async (dispatch, getState) => {
  console.log('here2', id);
  try {
    const res = await axios.get(
      `https://us-central1-grocery-king-302815.cloudfunctions.net/api/users/getLocationAddress/${id}`,
    );
    console.log('data2', res.data);
  } catch (err) {}
};
