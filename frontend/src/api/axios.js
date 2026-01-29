import axios from 'axios';

const API = axios.create({
    baseURL:'https://pos-system-4yqe.vercel.app/api',
    withCredentials:true
});

export default API 