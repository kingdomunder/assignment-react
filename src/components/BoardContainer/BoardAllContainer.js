import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { IS_LOGIN, ROUTE_PATH } from "../../constants";
import { getBoardAll, getBoardOne } from "../../api/BoardQuery";
import { loginAlert } from "../../alert";
import styles from "./BoardAllContainer.module.css"

function BoardAllContainer() {
	const navigate = useNavigate();

	const [boardData, setBoardData] = useState("");

	const handleBoardOne = async (seq) => {
		const result = await getBoardOne(seq);
		if (result) {
			navigate(ROUTE_PATH.boardOneView);
		}
	};

	const handleBoardWrite = () => {
		const isLogin = localStorage.getItem(IS_LOGIN);
		if (isLogin === "null" || !isLogin) {
			loginAlert();
		} else {
			navigate(ROUTE_PATH.boardWrite);
		}
	}

	useEffect(async () => {
		const data = await getBoardAll();
		setBoardData(data);
	}, []);

	return (
		<div className={styles.boardAllContainer}>
			<button onClick={handleBoardWrite}>Write</button>
			<table>
				{boardData.length != 0 && (
					<div>
						<tr>
							<th>SEQ</th>
							<th>TITLE</th>
							<th>EMAIL</th>
							<th>VIEW</th>
						</tr>
						<hr />
						{boardData.list.map(board => (
							<tr onClick={() => handleBoardOne(board.seq)}>
								<td>{board.seq}</td>
								<td>{board.title}</td>
								<td>{board.memberEmail}</td>
								<td>{board.viewCount}</td>
							</tr>
						))}
					</div>
				)}
			</table>
		</div>
	);
}

export default BoardAllContainer;
