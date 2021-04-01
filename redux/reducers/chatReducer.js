import produce from 'immer';
const initState = {
  room: null,
};

const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_ROOM':
      return produce(state, draft => {
        draft.room = action.payload;
      });
    default:
      return state;
  }
};

export default chatReducer;
