import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { BOARD_ONE, ROUTE_PATH } from "../../../constants"
import { boardDelete } from "../../../api/BoardCommand"

function BoardOneContainer() {

	const navigate = useNavigate()

	const [boardOne, setBoardOne] = useState("")

	const handleModify = () => {
		const data = {

		}
	}

	const handleDelete = async() => {
		const result = await boardDelete(boardOne.seq)
		if (result) {
			alert("삭제 성공")
			navigate(ROUTE_PATH.boardAllView)
		} else {
			alert("삭제 실패")
		}
	}

	useEffect(async () => {
		const data = await JSON.parse(localStorage.getItem(BOARD_ONE))
		setBoardOne(data)
	}, [])

	return (
		<div>
			<div>작성일 : {boardOne.createData}</div>
			<div>글번호 : {boardOne.seq}</div>
			<hr />

			<div>TITLE</div>
			<div>{boardOne.title}</div>
			<hr />

			<div>CONTENTS</div>
			<div>{boardOne.content}</div>
			<hr />

			<button onClick={() => navigate(ROUTE_PATH.BoardModify)}>Modify</button>
			<button onClick={handleDelete}>Delete</button>
			<br />
			<br />
			<button onClick={() => navigate(ROUTE_PATH.boardAllView)}>BACK</button>
		</div>
	)
}

export default BoardOneContainer
