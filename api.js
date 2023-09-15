import axios from 'axios';

const API = axios.create({
    baseURL: 'https://growthmate.link', // 백엔드 배포 주소
    headers: {
        'Content-Type' : 'application/json',
    },
});

export default API;