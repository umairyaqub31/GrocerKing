import axios from 'axios';

export const updateProfile = (id, lat, lng, address) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: 'PROFILE_LOADING',
  });
  const config = {
    headers: {
      'Content-type': 'Application/json',
    },
  };

  const body = {
    id,
    lat,
    lng,
    address,
  };

  try {
    const res = await axios.post(
      'https://us-central1-grocery-king-302815.cloudfunctions.net/api/users/updateAddress',
      body,
      config,
    );
    console.log(res.data);
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
