import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { authReducer } from './Auth/auth.reducers';


// Remove these lines as they are not needed
// const { legacy_createStore, combineReducers, applyMiddleware } = require("@reduxjs/toolkit");
// const { thunk } = require("redux-thunk");

const rootReducer = combineReducers({
    auth: authReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
