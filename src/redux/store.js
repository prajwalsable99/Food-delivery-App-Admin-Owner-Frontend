import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";

import { thunk } from "redux-thunk";
import { authReducer } from "./auth/authReducer";
import { restaurantReducer } from "./restaurant/restaurantReducer";
import { foodReducer } from "./food/foodReducer";
import { orderReducer } from "./order/orderReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer=combineReducers(
    {
        auth:authReducer,
        restaurant:restaurantReducer,
        food:foodReducer,
        order:orderReducer,
    }
)


export const store=legacy_createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ))