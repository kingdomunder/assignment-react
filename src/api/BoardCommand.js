import { ROUTE_PATH, API_PATH } from "../constants";
import API from "./API";

export const boardWrite = async(boardData) => {
    let result = false
    await API.post(API_PATH.boardWrite, boardData)
    .then(res => {
        console.log(res.data)
        result = true
    })
    .catch(err => {
        console.log(err.message)
    })
    return result
}

export const boardModify = async(modifyData) => {
    let result = false
    await API.put(API_PATH.boardModify, modifyData)
    .then(res => {
        console.log(res.data)
        result = true
    })
    .catch(err => {
        console.log(err.message)
    })
    return result
}

export const boardDelete = async(id) => {
    let result = false
    await API.delete(API_PATH.boardDelete + id)
    .then(res => {
        console.log(res.data)
        result = true
    })
    .catch(err => {
        console.log(err.message)
    })
    return result
}

export const replyWrite = async(replyData) => {
    let result = false
    await API.post(API_PATH.replyWrite, replyData)
    .then(res => {
        console.log(res.data)
        result = true
    })
    .catch(err => {
        console.log(err.message)
    })
    return result
}

export const replyModify = async(replyData) => {
    let result = false
    await API.put(API_PATH.replyWrite, replyData)
    .then(res => {
        console.log(res.data)
        result = true
    })
    .catch(err => {
        console.log(err.message)
    })
    return result
}

export const replyDelete = async(id) => {
    let result = false
    await API.delete(API_PATH.replyWrite + id)
    .then(res => {
        console.log(res.data)
        result = true
    })
    .catch(err => {
        console.log(err.message)
    })
    return result
}