import API from "./API";
import { BOARD_ALL, BOARD_ONE, API_PATH, DEFAULT } from "../constants";

export const getBoardAll = async(page) => {
    let result = false
    await API.get(API_PATH.boardAllView, {
        params: {
            "size" : DEFAULT.boardSize,
            page
        }
    })
    .then(res => {
        result = res.data.data
        console.log(result)
    })
    .catch(err => {
        console.log(err.message)
    })
    if (result) {
        return result
    }
}

export const getBoardOne = async (seq) => {
    let result = false
    await API.get(API_PATH.boardOneView + seq)
    .then(res => {
        console.log(res.data)
        sessionStorage.setItem(BOARD_ONE, JSON.stringify(res.data.data))
        result = true
    })
    .catch(err => {
        console.log(err.message)
    })
    if (result) {
        return result
    }
}