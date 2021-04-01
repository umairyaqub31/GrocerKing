import produce from 'immer';
const initState = {
  cart: [],
  cartLoading: false,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CART_LOADING':
      return produce(state, draft => {
        draft.cartLoading = true;
      });
    case 'ADD_TO_CART':
      return produce(state, draft => {
        draft.cart.push({product: action.payload, quantity: action.quantity});
      });
    case 'UPDATE_QUANTITY':
      return produce(state, draft => {
        const index = state.cart.findIndex(q => q.product.id === action.id);
        draft.cart[index].quantity = action.quantity;
      });
    case 'REMOVE_FROM_CART':
      return produce(state, draft => {
        const filteredCart = state.cart.filter(c => c.product.id !== action.id);
        draft.cart = filteredCart;
      });
    default:
      return state;
  }
};

export default cartReducer;
