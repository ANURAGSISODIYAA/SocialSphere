const { legacy_createStore, combineReducers, applyMiddleware } = require("@reduxjs/toolkit");
const { thunk } = require("redux-thunk");

const rootReducers = combineReducers({

})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))