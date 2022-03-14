import { useEffect } from 'react';
import { getBoardAll } from '../../api/BoardQuery';
import { BOARD_ALL } from '../../constants';
import MainContents from './MainContents/MainContents';

function MainContainer() {

	useEffect(async () => {
		const data = JSON.stringify(await getBoardAll(0)); //첫 화면에서 미리 게시판 1페이지 정보 불러오기
		sessionStorage.setItem(BOARD_ALL, data);
	}, []);

	return (
		<div>
			<MainContents />
		</div>
	)
}

export default MainContainer
