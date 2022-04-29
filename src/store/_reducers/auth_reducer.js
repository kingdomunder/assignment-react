import { FETCH_BOARD_ONE_DATA } from "../_actions/type"
import { AUTH } from '../_actions/type'

const initialState = {
	token: null
}

export default function auth_reducer(state = initialState, action) {
	switch (action.type) {
		case AUTH.LOGIN: return {
				...state,
				token: action.payload
		}
		case AUTH.LOGOUT: return {
				...state,
				token: null
		}
		default:
			return state
	}
}
