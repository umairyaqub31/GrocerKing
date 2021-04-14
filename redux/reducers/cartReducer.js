import produce from 'immer';
const initState = {
  cart: [],
  cartLoading: false,
  orders: [],
  ordersLoading: false,
  orderSendLoading: false,
  orderSend: false,
  orderData: null,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CART_LOADING':
      return produce(state, draft => {
        draft.cartLoading = true;
      });
    case 'ORDER_SEND_LOADING':
      return produce(state, draft => {
        draft.orderSendLoading = true;
      });
    case 'ORDER_SEND':
      return produce(state, draft => {
        draft.orderSendLoading = false;
        draft.orderSend = true;
        draft.orderData = action.payload;
      });
    case 'ORDER_SEND_RESET':
      return produce(state, draft => {
        draft.orderSend = false;
        draft.orderSend = null;
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
    case 'ORDERS_LOADING':
      return produce(state, draft => {
        draft.ordersLoading = true;
      });
    case 'GET_ORDERS':
      return produce(state, draft => {
        draft.orders = action.payload;
        draft.ordersLoading = false;
      });
    case 'RESET_CART':
      return produce(state, draft => {
        draft.cart = [];
        draft.orders = [];
      });
    default:
      return state;
  }
};

export default cartReducer;
