import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BOARD_ALL, IS_LOGIN, ROUTE_PATH } from "../../constants";
import { getBoardAll, getBoardOne } from "../../api/BoardQuery";
import { loginAlert } from "../../alert";
import Pagination from "../Pagination/Pagination";
import styles from "./BoardAllContainer.module.css"

function BoardAllContainer() {
	const navigate = useNavigate();

	const [boardData, setBoardData] = useState("");
	const [boardTotalPage, setBoardTotalPage] = useState("");

	const handleBoardOne = async (seq) => {
		const result = await getBoardOne(seq);
		if (result) {
			navigate(ROUTE_PATH.boardOneView + seq);
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
		const storageData = JSON.parse(localStorage.getItem(BOARD_ALL));
		if(storageData !== "null" && storageData) {
			setBoardData(storageData);
			setBoardTotalPage(storageData.totalSize);
		}
		const data = await getBoardAll();
		setBoardData(data);
	}, []);

	return (
		<div>
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
			<div>
				<Pagination 
					
					totlaPage={boardTotalPage}/>
			</div>
		</div>
	);
}

export default BoardAllContainer;
