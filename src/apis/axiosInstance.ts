import axios from 'axios';

export const petAxiosInstance = axios.create({
  baseURL: `http://openapi.seoul.go.kr:8088`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer test',
  },
});
