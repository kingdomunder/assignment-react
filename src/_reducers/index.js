import { combineReducers } from "redux";
import boardOne from "./board_reducer";

const rootReducer = combineReducers({
    boardOne: boardOne,
})

export default rootReducer;