import {combineReducers} from 'redux';

import userReducer from './reducers/userReducer';
import categoryReducer from './reducers/categoryReducer';
import promotionReducer from './reducers/promotionReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import wishlistReducer from './reducers/wishlistReducer';
import chatReducer from './reducers/chatReducer';

export default combineReducers({
  user: userReducer,
  category: categoryReducer,
  promotion: promotionReducer,
  product: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  chat: chatReducer,
});
