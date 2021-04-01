import axios from 'axios';

export const SignUp = (data, id, location) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-type': 'Application/json',
    },
  };

  const body = {
    name: data.name,
    address: data.address,
    lat: location.lat,
    lng: location.lng,
  };
  try {
    const res = await axios.post(
      `https://us-central1-grocery-king-302815.cloudfunctions.net/api/users/signUp/${id}`,
      body,
      config,
    );
    console.log('signup', res.data);
    dispatch({
      type: 'UPDATE_USER',
      payload: data.name,
    });
  } catch (err) {
    console.log(err);
  }
};
