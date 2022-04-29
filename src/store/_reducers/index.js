import { combineReducers } from "redux";
import auth_reducer from "./auth_reducer";

export const rootReducer = combineReducers({
    auth: auth_reducer
})
