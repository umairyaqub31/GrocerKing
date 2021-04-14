import produce from 'immer';
const initState = {
  promotion: [],
  promotionLoading: false,
};

const promotionReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PROMOTIONS_LOADING':
      return produce(state, draft => {
        draft.promotionLoading = true;
      });
    case 'GET_PROMOTIONS':
      console.log('promotion', action.payload);
      return produce(state, draft => {
        draft.promotion = action.payload;
        draft.promotionLoading = false;
      });
    case 'ADD_PROMOTION':
      return produce(state, draft => {
        draft.promotion.push(action.payload);
      });
    case 'EMPTY_PROMOTIONS':
      return produce(state, draft => {
        draft.promotion = [];
      });
    default:
      return state;
  }
};

export default promotionReducer;
