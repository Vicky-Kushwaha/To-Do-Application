import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';
import {todoReducer} from "./reducer/todoReducer.js";


const reducer = combineReducers({
  listData : todoReducer
});


const middleware = [thunk];

let initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
