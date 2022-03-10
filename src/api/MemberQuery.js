import { API_PATH, DEFAULT } from "../constants";
import API from "./API";

export const getMemberAll = async() => {
    let result = false
    await API.get(API_PATH.memberAllView, {
        params: DEFAULT.searchMemberAll,
    })
    .then(res => {
        console.log(res.data.data.list)
        result = res.data.data.list
    })
    .catch(err => {
        console.log(err.message)
    })
    if (result) {
        return result
    }
}

export const getMemberOne = async(email) => {
    let result = false
    await API.get(API_PATH.memberOneView, {
        params: {
            email
        }
    })
    .then(res => {
        result = res.data.data
    })
    .catch(err => {
        console.log(err.message)
    })
    if (result) {
        return result
    }
}