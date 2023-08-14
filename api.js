import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api', // url 수정. 집 wifi ip?
    headers: {
        'Content-Type' : 'application/json',
    },
});

export default API;