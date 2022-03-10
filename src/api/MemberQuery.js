import { API_PATH, DEFAULT } from "../constants";
import API from "./API";

export const getMemberAll = async(navigate) => {
    let result = false
    await API.get(API_PATH.memberAll, {
        params: DEFAULT.memberAllView,
    })
    .then(res => {
        result = res.data.data.list
    })
    .catch(err => {
        console.log(err.message)
    })
    if (result) {
        return result
    }
}

export const getMemberOne = async(navigate, email) => {
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