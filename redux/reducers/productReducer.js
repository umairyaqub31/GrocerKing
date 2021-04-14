import produce from 'immer';
const initState = {
  products: [],
  productsLoading: false,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PRODUCTS_LOADING':
      return {
        ...state,
        productsLoading: true,
      };
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        productsLoading: false,
      };
    case 'ADD_PRODUCTS':
      return produce(state, draft => {
        draft.products.push(action.payload);
        draft.productsLoading = false;
      });
    case 'UPDATE_PRODUCTS':
      return produce(state, draft => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        draft.products[index] = action.payload;
      });
    case 'EMPTY_PRODUCTS':
      return produce(state, draft => {
        draft.products = [];
      });
    default:
      return state;
  }
};

export default productReducer;
