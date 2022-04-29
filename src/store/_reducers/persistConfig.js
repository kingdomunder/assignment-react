import { combineReducers } from "redux";
import auth from "./persist_configt_config"

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  // sessionStorage에 저장 <--> blacklist
  whitelist: ["auth"]
};

const rootReducer = combineReducers({
  auth: auth,
})

export default persistReducer(persistConfig, rootReducer)