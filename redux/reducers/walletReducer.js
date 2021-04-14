import produce from 'immer';
const initState = {
  balance: null,
};

const walletReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_FUNDS':
      return produce(state, draft => {
        draft.balance = action.payload;
      });
    default:
      return state;
  }
};

export default walletReducer;
