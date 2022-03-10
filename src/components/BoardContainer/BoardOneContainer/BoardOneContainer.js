import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { BOARD_ONE, ROUTE_PATH } from "../../../constants"
import { boardDelete, replyWrite, replyModify, replyDelete } from "../../../api/BoardCommand"
import { getBoardOne } from "../../../api/BoardQuery"
import ReplyContainer from "./ReplyContainer/ReplyContainer"
import styles from "./BoardOneContainer.module.css"

function BoardOneContainer() {

	const navigate = useNavigate()

	const [boardOne, setBoardOne] = useState("")
	const [replyContent, setReplyContent] = useState("")
	const [replyModifyContent, setReplyModifyContent] = useState("")
	const [isReplyModifying, setIsReplyModifying] = useState(false)
	const [modifyingReply, setModifyingReply] = useState("")

	const handleDelete = async() => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			const result = await boardDelete(boardOne.seq)
			if (result) {
				alert("삭제 성공")
				navigate(ROUTE_PATH.boardAllView)
			} else {
				alert("삭제 실패. 잠시 후에 다시 시도해주세요")
			}
		}
	}

	const handleReplyWrite = async() => {
		const replyData = {
			"boardSeq" : boardOne.seq,
			"content" : replyContent
		}
		const result = await replyWrite(replyData)
		if (result) {
			handleReload()
		} else {
			alert("댓글등록 실패.")
		}
	}

	const handleReplyModify = (reply) => {
		if (reply) {
			setReplyModifyContent(reply.content)
			setIsReplyModifying(true)
			setModifyingReply(reply.seq)
		} else {
			setIsReplyModifying(false)
			setModifyingReply("")
		}
	}

	const handleReplyModifyConfirm = async() => {
		const data = {
			"content" : replyModifyContent,
			"seq" : modifyingReply
		}
		const result = await replyModify(data)
		if (result) {
			handleReload()
		} else {
			alert("댓글수정 실패.")
		}
	}

    const handleReplyDelete = async (seq) => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			const result = await replyDelete(seq)
			if (result) {
				// handleReload()
			}
		}
    }

	const handleReload = async() => {
		await getBoardOne(boardOne.seq)
		window.location.reload()
	}

	useEffect(async () => {
		const data = await JSON.parse(localStorage.getItem(BOARD_ONE))
		setBoardOne(data)
	}, [])

	return (
		<div>
			<div>
				<div>작성일 : {boardOne.createData}</div>
				<div>글번호 : {boardOne.seq}</div>
				<hr />

				<div>TITLE</div>
				<div className={styles.boardTitleContainer}>{boardOne.title}</div>
				<hr />

				<div>CONTENTS</div>
				<div className={styles.boardContentContainer}>{boardOne.content}</div>
				<hr />

				<button onClick={() => navigate(ROUTE_PATH.BoardModify)}>Modify</button>
				<button onClick={handleDelete}>Delete</button>
				<br />
				<br />
				<button onClick={() => navigate(ROUTE_PATH.boardAllView)}>BACK</button>
			</div>
			<div>
				<div><h3>댓글</h3></div>
				{boardOne.replies && 
					boardOne.replies.map(reply => (	

						<div className={styles.replyContainer}>
							{isReplyModifying && modifyingReply === reply.seq ?
								<div>
									<textarea 
										style={{resize: "none"}}
										onChange={e => setReplyModifyContent(e.target.value)}
										rows="5" 
										cols="100" 
										maxlength="500" 
										spellcheck="false" 
										value={replyModifyContent} />
										<button onClick={() => handleReplyModifyConfirm(reply.seq)}>Confirm</button>
										<button onClick={() => handleReplyModify(false)}>취소</button>
								</div>
								:
								<div>
									<ReplyContainer reply={reply} /> 
									<button onClick={() => handleReplyModify(reply)}>수정</button>
									<button onClick={() => handleReplyDelete(reply.seq)}>삭제</button>
								</div>
							}
						</div>
					)
				)}
				<div>
					<textarea 
						style={{resize: "none"}}
						onChange={e => setReplyContent(e.target.value)}
						rows="5" 
						cols="100" 
						maxlength="500" 
						spellcheck="false" 
						value={replyContent} />
					<button onClick={handleReplyWrite}>댓글달기</button>
				</div>
			</div>
		</div>
	)
}

export default BoardOneContainer
