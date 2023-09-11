import axios from 'axios';

const API = axios.create({
    baseURL: ' http://ec2-13-209-183-252.ap-northeast-2.compute.amazonaws.com/', // 백엔드 배포 주소
    headers: {
        'Content-Type' : 'application/json',
    },
});

export default API;