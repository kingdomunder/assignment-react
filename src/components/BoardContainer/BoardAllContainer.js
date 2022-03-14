import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BOARD_ALL, IS_LOGIN, ROUTE_PATH } from "../../constants";
import { getBoardAll, getBoardOne } from "../../api/BoardQuery";
import LoginAlert from "../Alert/LoginAlert";
import Pagination from "../Pagination/Pagination";
import styles from "./BoardAllContainer.module.css"

function BoardAllContainer() {
	const navigate = useNavigate();

	const [boardData, setBoardData] = useState([]);
	const [boardTotalPage, setBoardTotalPage] = useState("");

	const handleBoardOne = async (seq) => {
		const result = await getBoardOne(seq);
		if (result) {
			navigate(ROUTE_PATH.boardOneView + seq);
		}
	};

	const handleBoardWrite = () => {
		const isLogin = sessionStorage.getItem(IS_LOGIN);
		if (isLogin === "null" || !isLogin) {
			LoginAlert();
		} else {
			navigate(ROUTE_PATH.boardWrite);
		}
	}
	
	const setBoardToStorage = (data) => {
		setBoardData(data);
		setBoardTotalPage(data.totalSize);
	};

	useEffect(async () => {
		const storageData = JSON.parse(sessionStorage.getItem(BOARD_ALL));
		if (storageData) {
			setBoardToStorage(storageData)
		};
		const getBoardData = await getBoardAll();
		if (getBoardData !== storageData) { // 업데이트 - 메인에서 불러온 게시판 정보와 새로 불러온 게시판 정보가 다르면, 새로운 게시판 정보로 갱신 
			setBoardToStorage(getBoardData);
		} 
		if (!storageData && !getBoardData) {
			alert("등록된 글이 없습니다");
			navigate(ROUTE_PATH.main);
		}
	}, []);

	return (
		<div>
			<div className={styles.boardAllContainer}>
				<button onClick={handleBoardWrite}>Write</button>
				<table>
					{boardData &&
					boardData.length != 0 && 
						<div>
							<tr>
								<th>SEQ</th>
								<th>TITLE</th>
								<th>EMAIL</th>
								<th>VIEW</th>
							</tr>
							<hr />
							{boardData.list.map(board => (
								<tr key={board.seq} onClick={() => handleBoardOne(board.seq)}>
									<td>{board.seq}</td>
									<td>{board.title}</td>
									<td>{board.memberEmail}</td>
									<td>{board.viewCount}</td>
								</tr>
							))}
						</div>
					}
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
