import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { BOARD_ONE, ROUTE_PATH } from "../../../constants"
import { boardWrite } from '../../../api/BoardCommand'

function BoardModifyContainer() {

	const navigate = useNavigate()

	const [seq, setSeq] = useState("")
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")

	const handleBoardModify = async () => {
		const data = {
			seq,
			title,
			content
		}
		const result = await boardWrite(data)
		if (result) {
			alert("수정 성공")
		} else {
			alert("수정 실패")
		}
	}

	const handleBack = () => {
		handleClear()
		navigate(ROUTE_PATH.boardAllView)
	}

	const handleClear = () => {
		setSeq("")
		setTitle("")
		setContent("")
	}

	useEffect(async () => {
		const data = await JSON.parse(localStorage.getItem(BOARD_ONE))
		setSeq(data.seq)
		setTitle(data.title)
		setContent(data.content)
	}, [])	

	return (
		<div>
			<div>TITLE</div>
			<input type="text"
				value={title}
				onChange={e => setTitle(e.target.value)} />
			<hr />
			<div>CONTENT</div>
			<textarea style={{ resize: "none" }}
				rows="1"
				cols="99"
				maxlength="50"
				spellcheck="false"
				autofocus
				required
				value={content}
				onChange={e => setContent(e.target.value)} />
			<hr />
			<button onClick={handleBoardModify}>Confirm</button>
			<br />
			<br />
			<button onClick={() => navigate(ROUTE_PATH.boardOneView)}>BACK</button>
		</div>
	)
}

export default BoardModifyContainer