import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';

import postsReducer from "./posts/reducer";
import authReducer from './auth/reducer';
import categoriesReducer from "./categories/reducer";
import commentsReducer from "./comments/reducer";


const rootReducer = combineReducers({
  Posts: postsReducer,
  Auth: authReducer,
  Categories: categoriesReducer,
  Comments: commentsReducer
});

const middleware = applyMiddleware(thunk)

const store = createStore(rootReducer, middleware);

export default store;