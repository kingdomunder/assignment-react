import { getBoardOne } from "../api/BoardQuery"
import { FETCH_BOARD_ONE_DATA } from "./type"

export const board_actions = {
  fetchBoardOneData: () => ({ type: FETCH_BOARD_ONE_DATA }),

  fetchBoardOne: getBoardOne,
}
