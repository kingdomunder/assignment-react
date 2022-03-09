import { API_PATH } from "../constants";
import API from "./API";

export const getBoardAll = () => {
    API.get(API_PATH.boardAll)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err.message)
    })
}