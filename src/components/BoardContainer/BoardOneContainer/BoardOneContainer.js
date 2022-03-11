import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ADMIN_AUTH, BOARD_ONE, ROUTE_PATH, USER_AUTH } from "../../../constants"
import { boardDelete, replyWrite, replyModify, replyDelete } from "../../../api/BoardCommand"
import { getBoardOne } from "../../../api/BoardQuery"
import ReplyContainer from "./ReplyContainer/ReplyContainer"
import styles from "./BoardOneContainer.module.css"

function BoardOneContainer({ boardSeq }) {

	const navigate = useNavigate();

	const [boardOne, setBoardOne] = useState("");
	const [replyContent, setReplyContent] = useState("");
	const [replyModifyContent, setReplyModifyContent] = useState("");
	const [isReplyModifying, setIsReplyModifying] = useState(false);
	const [isWriter, setIsWriter] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [modifyingReply, setModifyingReply] = useState("");

	const handleBoardDelete = async() => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			const result = await boardDelete(boardOne.seq);
			if (result) {
				alert("삭제 성공");
				navigate(ROUTE_PATH.boardAllView);
			};
		};
	};

	const handleReplyWrite = async() => {
		const replyData = {
			"boardSeq" : boardOne.seq,
			"content" : replyContent
		};
		const result = await replyWrite(replyData);
		if (result) {
			handleReload();
		};
	};

	const handleReplyModify = (reply) => {
		if (reply) {
			setReplyModifyContent(reply.content);
			setIsReplyModifying(true);
			setModifyingReply(reply.seq);
		} else {
			setIsReplyModifying(false);
			setModifyingReply("");
		};
	};

	const handleReplyModifyConfirm = async() => {
		const data = {
			"content" : replyModifyContent,
			"seq" : modifyingReply
		}
		const result = await replyModify(data);
		if (result) {
			handleReload();
		};
	};

    const handleReplyDelete = async (seq) => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			const result = await replyDelete(seq);
			if (result) {
				handleReload();
			};
		};
    };

	const handleReload = async() => {
		await getBoardOne(boardOne.seq);
		window.location.reload();
	};

	useEffect(async() => {
		const boardOneData = await JSON.parse(localStorage.getItem(BOARD_ONE));
		const userEmailData = localStorage.getItem(USER_AUTH);
		setBoardOne(boardOneData);
		setUserEmail(userEmailData);
		if (boardOneData.memberEmail === userEmail) {
			setIsWriter(true);
		};
	}, []);

	return (
		<div>
			<div>
				<div>작성일 : {boardOne.createData}</div>
				<div>글번호 : {boardOne.seq}</div>
				<div>작성자 : {boardOne.memberEmail}</div>
				<hr />

				<div>TITLE</div>
				<div className={styles.boardTitleContainer}>{boardOne.title}</div>
				<hr />

				<div>CONTENTS</div>
				<div className={styles.boardContentContainer}>{boardOne.content}</div>
				<hr />
				{isWriter &&
					<div>
						<button onClick={() => navigate(ROUTE_PATH.BoardModify + boardOne.seq)}>Modify</button>
						<button onClick={handleBoardDelete}>Delete</button>
					</div>
				}
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
										maxLength="500" 
										spellCheck="false" 
										value={replyModifyContent} />
										<button onClick={() => handleReplyModifyConfirm(reply.seq)}>Confirm</button>
										<button onClick={() => handleReplyModify(false)}>취소</button>
								</div>
								:
								<div>
									<ReplyContainer reply={reply} /> 
									{((userEmail === reply.memberEmail) || (localStorage.getItem(ADMIN_AUTH) === ADMIN_AUTH)) &&
									!reply.deleted &&
										<div>
											<button onClick={() => handleReplyModify(reply)}>수정</button>
											<button onClick={() => handleReplyDelete(reply.seq)}>삭제</button>
										</div>
									}
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
						maxLength="500" 
						spellCheck="false" 
						value={replyContent} />
					<button onClick={handleReplyWrite}>댓글달기</button>
				</div>
			</div>
		</div>
	)
}

export default BoardOneContainer
