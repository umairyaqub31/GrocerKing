const initState = {
  user: null,
  isLoading: false,
  setUser: null,
  signedUp: false,
  address: null,
  location: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      if (state.user === null) {
        return {
          ...state,
          user: action.payload,
        };
      } else {
        return {
          ...state,
        };
      }
    case 'SET_USER':
      return {
        ...state,
        setUser: action.payload,
      };
    case 'SET_ADDRESS':
      console.log('reducer', action.payload);
      return {
        ...state,
        address: action.payload,
      };
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload,
      };
    case 'UPDATE_USER':
      console.log('update');
      return {
        ...state,
        signedUp: true,
      };
    case 'RESET_USER':
      return {
        ...state,
        user: null,
        address: null,
        location: null,
      };
    default:
      return state;
  }
};

export default userReducer;
