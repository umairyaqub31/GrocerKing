const initState = {
  category: null,
  categoryLoading: false,
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CATEGORY_LOADING':
      return {
        ...state,
        categoryLoading: true,
      };
    case 'GET_CATEGORY':
      return {
        ...state,
        category: action.payload,
        categoryLoading: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
