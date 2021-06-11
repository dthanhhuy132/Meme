import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';

import postsReducer from "./posts/reducer";
import authReducer from './auth/reducer';


const rootReducer = combineReducers({
  Posts: postsReducer,
  Auth: authReducer
});

const middleware = applyMiddleware(thunk)

const store = createStore(rootReducer, middleware);

export default store;