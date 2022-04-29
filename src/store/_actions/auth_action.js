// action type
import { getUser, registerPhotographer, registerUser } from "../api/Auth"
import { LOGIN, LOGOUT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "./type"
import { AUTH } from './type'

// action creator
// simply creates an action
// function returning action
export const auth_actions = {
  login: () => ({ type: AUTH.LOGIN, payload: token }),
  logout: () => ({ type: AUTH.LOGOUT }),

  fetchUserRequest: () => ({ type: FETCH_USER_REQUEST}),
  fetchUserSuccess: user => ({ type: FETCH_USER_SUCCESS, payload: user}),
  fetchUserFailure: err => ({ type: FETCH_USER_FAILURE, payload: err}),

  // action creator
  fetchUser: getUser,
  registerUser: registerUser,
  registerPhotographer: registerPhotographer
}
