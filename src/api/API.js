import axios from 'axios'
import { ACCESS_TOKEN, SERVER_URL } from '../constants'
import { loginAlert } from '../alert';

const API = axios.create({
	baseURL: SERVER_URL,
})

const getToken = () => {
	const token = localStorage.getItem(ACCESS_TOKEN);
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
		loginAlert();
    }
});

export default API