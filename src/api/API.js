import axios from 'axios'
import { ACCESS_TOKEN, SERVER_URL, ROUTE_PATH } from '../constants'
import LoginAlert from '../components/Alert/LoginAlert';

const API = axios.create({
	baseURL: SERVER_URL,
})

const getToken = () => {
	const token = sessionStorage.getItem(ACCESS_TOKEN);
	if (token) {
		return `Bearer ${token}`;
	} else {
		return null;
	}
};

API.interceptors.request.use(config => {
	config.headers["content-type"] = "application/json; charset=utf-8";
	config.headers["X-Requested-With"] = "XMLHttpRequest";
	config.headers["Accept"] = "*/*";
	config.headers["Authorization"] = getToken();
	return config;
});

API.interceptors.response.use(response => {
	return response
}, error => {
    if (401 === error.response.status) {
		LoginAlert(ROUTE_PATH.login);
    }
});

export default API