const initState = {
  user: null,
  isLoading: false,
  setUser: null,
  signedUp: false,
  address: null,
  location: null,
  profileLoading: false,
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

    case 'PROFILE_LOADING':
      return {
        ...state,
        profileLoading: true,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        address: action.payload.address,
        location: {
          lat: action.payload.lat,
          lng: action.payload.lng,
        },
        profileLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
