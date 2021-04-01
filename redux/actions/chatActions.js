export const addRoom = room => (dispatch, getState) => {
  dispatch({
    type: 'ADD_ROOM',
    payload: room,
  });
};
