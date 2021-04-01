import produce from 'immer';
const initState = {
  wishlist: [],
  wishlistLoading: false,
};

const wishlistReducer = (state = initState, action) => {
  switch (action.type) {
    case 'WISHLIST_LOADING':
      return produce(state, draft => {
        draft.wishlistLoading = true;
      });
    case 'ADD_TO_WISHLIST':
      return produce(state, draft => {
        draft.wishlist.push({
          product: action.payload,
        });
      });
    case 'REMOVE_FROM_WISHLIST':
      console.log('hello');
      return produce(state, draft => {
        const filteredWishlist = state.wishlist.filter(
          c => c.product.id !== action.id,
        );
        draft.wishlist = filteredWishlist;
      });
    case 'GET_WISHLIST':
      console.log('reducer', action.payload);
      return produce(state, draft => {
        draft.wishlist = action.payload;
      });
    case 'EMPTY_WISHIST':
      return produce(state, draft => {
        draft.wishlist = [];
      });
    default:
      return state;
  }
};

export default wishlistReducer;
