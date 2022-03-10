import { SIGNUP } from '../_actions/type'

const initialState = {
    user: {
        city: '',
        email: '',
        name: '',
        password: '',
        street: '',
        zipcode: ''
    }
}

const auth_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
            }
        default:
            return state
    }
}

export default auth_reducer