export const updateProfile = (id, lat, lng, address) => async (
  dispatch,
  getState,
) => {
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
      'https://us-central1-grocery-king-302815.cloudfunctions.net/api/updateAddress',
      body,
      config,
    );
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
