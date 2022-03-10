import { ROUTE_PATH, API_PATH, DEFAULT } from "../constants";
import API from "./API";

export const AdminModifyMember = async(modifyData) => {
    console.log(modifyData)
    let result = false
    await API.put(API_PATH.adminModifyMember, modifyData)
    .then(res => {
        console.log(res.data)
        result = true
    })
    .catch(err => {
        console.log(err.message)
    })
    if (result) {
        return result
    }
}

export const AdminAuthMember = async(memberAuthData) => {
    let result = false
    await API.put(API_PATH.adminAuthMember, memberAuthData)
    .then(res => {
        console.log(res.data)
        result = true
    })
    .catch(err => {
        console.log(err.message)
    })
    if (result) {
        return result
    }
}

export const AdminDeleteMember = async(email) => {
    let result = false
    await API.delete(API_PATH.adminDeleteMember + email)
    .then(res => {
        console.log(res.data.data)
        result = true
    })
    .catch(err => {
        console.log(err.message)
    })
    if (result) {
        return result
    }
}