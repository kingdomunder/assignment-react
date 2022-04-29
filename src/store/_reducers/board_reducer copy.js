import { FETCH_BOARD_ONE_DATA } from "../_actions/type"

const initialState = {
    isClicked: false,
    boardOne: {
      content: "",
      createData: "",
      memberEmail: "",
      replies: "",
      seq: "",
      title: "",
      updateDate: "",
      viewCount: ""
    }
}

const board_reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_BOARD_ONE_DATA: return {
      ...state,
      isClicked: true
    }
    default: return state
  }
}

export default board_reducer;