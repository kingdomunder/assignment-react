import { useNavigate } from 'react-router-dom';
import { IS_LOGIN, ROUTE_PATH } from '../../constants';
import LoginAlert from '../Alert/LoginAlert';
import Button from '@mui/material/Button';

function BoardWriteButton() {
    const navigate = useNavigate();

    const handleBoardWrite = () => {
		const isLogin = sessionStorage.getItem(IS_LOGIN);
		if (!isLogin) {
			LoginAlert();
		} else {
			navigate(ROUTE_PATH.boardWrite);
		};
	};

    return (
        <Button
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
            onClick={handleBoardWrite}
        >
            Write
        </Button>
    )
}

export default BoardWriteButton