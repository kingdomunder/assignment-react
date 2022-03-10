import API from "./API";
import { BOARD_ALL, BOARD_ONE, API_PATH, DEFAULT } from "../constants";

export const getBoardAll = async () => {
    let result = false
    await API.get(API_PATH.boardAllView, {
        params: DEFAULT.boardAllView
    })
    .then(res => {
        result = res.data.data
        localStorage.setItem(BOARD_ALL, JSON.stringify(result.list)) //임시로 로컬스토리지에 저장
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
        localStorage.setItem(BOARD_ONE, JSON.stringify(res.data.data))
        result = true
    })
    .catch(err => {
        console.log(err.message)
    })
    if (result) {
        return result
    }
}