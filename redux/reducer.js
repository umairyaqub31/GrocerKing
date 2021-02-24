import {combineReducers} from 'redux';

// ## Generator Reducer Imports
// import app from '../modules/AppState';

// import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
// import errorReducer from './reducers/errorReducer';
// import notificationReducer from './reducers/notificationReducer';
// import fuelReducer from './reducers/fuelReducer';
// import lmsReducer from './reducers/lmsReducer';
// import temperatureReducer from './reducers/temperatureReducer';
// import coldChainReducer from './reducers/coldChainReducer';
// import emReducer from './reducers/energyReducer';
// import tankReducer from './reducers/tankReducer';
// import envReducer from './reducers/envReducer';

export default combineReducers({
  // ## Generator Reducers
  // app,
  // auth: authReducer,
  user: userReducer,
  // error: errorReducer,
  // notification: notificationReducer,
  // fuel: fuelReducer,
  // lms: lmsReducer,
  // temperature: temperatureReducer,
  // coldchain: coldChainReducer,
  // energy: emReducer,
  // tank: tankReducer,
  // env: envReducer
});
