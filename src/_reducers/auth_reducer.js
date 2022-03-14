import { combineReducers } from "redux";
import auth from "./auth_reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 sessionStorage에 저장합니다.
  whitelist: ["auth", "photogrpher", "categories"]
  // blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({
  auth: auth,
})

export default persistReducer(persistConfig, rootReducer)