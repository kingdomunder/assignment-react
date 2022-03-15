import { useState } from 'react';
import { useParams } from 'react-router';
import { replyDelete } from '../../../../api/BoardCommand';
import { getBoardOne } from '../../../../api/BoardQuery';
import { replyModify } from '../../../../api/BoardCommand';
import styles from './ReplyContainer.module.css'
import Button from '@mui/material/Button';

function ReplyContainer( {replies, userEmail, isAdmin} ) {
	const [isReplyModifying, setIsReplyModifying] = useState(false);
	const [replyModifiedSeq, setReplyModifiedSeq] = useState("");
	const [replyModifiedContent, setReplyModifiedContent] = useState("");

	let { boardSeq } = useParams();

	const handleReplyDelete = async (seq) => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			const result = await replyDelete(seq);
			if (result) {
				handleReload();
			};
		};
	};

	const handleReplyModify = (reply) => {
		if (reply) {
			setIsReplyModifying(true);
			setReplyModifiedSeq(reply.seq);
			setReplyModifiedContent(reply.content);
		} else {
			setIsReplyModifying(false);
			setReplyModifiedSeq("");
		};
	};

	const handleReplyModifyConfirm = async () => {
		const data = {
			"seq": replyModifiedSeq,
			"content": replyModifiedContent
		}
		const result = await replyModify(data);
		if (result) {
			handleReload();
		};
	};

	const handleReload = async () => {
		await getBoardOne(boardSeq);
		window.location.reload();
	};

	return (
		<div>
			{replies.map(reply => (
				<div key={reply.seq}>
					<hr />
					{isReplyModifying && (replyModifiedSeq === reply.seq) ? 
						<div>
							<textarea 
								className={styles.textarea}
								style={{resize: "none"}}
								onChange={e => setReplyModifiedContent(e.target.value)}
								rows="5" 
								cols="100" 
								maxLength="500" 
								spellCheck="false" 
								value={replyModifiedContent} />
							<div className={styles.buttoneBox}>
								<Button
									variant="contained"
									onClick={() => handleReplyModifyConfirm()}
								>
									수정
								</Button>
								<Button
									variant="contained"
									color="warning"
									onClick={() => handleReplyModify()}
								>
									취소
								</Button>
								<br />
								<br />
							</div>
						</div>
					:
					<div className={styles.replyBox}>
						<div>
							<span className={styles.spanEmail}>{reply.memberEmail}</span><br />
							<span>{reply.content}</span><br />
							<span className={styles.spanDate}>{reply.updateDate}</span><br />
						</div>
						{!reply.deleted &&
						<div>
							{((userEmail === reply.memberEmail) || (isAdmin)) &&
								<div className={styles.buttoneBox}>
									<Button
										variant="contained"
										onClick={() => handleReplyModify(reply)}
									>
										댓글수정
									</Button>
									<Button
										variant="contained"
										color="error"
										onClick={() => handleReplyDelete(reply.seq)}
									>
										댓글삭제
									</Button>
								</div>
							}
						</div>
						}
					</div>
					}
				</div>
			))}

			<span></span>
		</div>
	)
}

export default ReplyContainer