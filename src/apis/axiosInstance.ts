import axios from 'axios';

export const petAxiosInstance = axios.create({
  baseURL: `http://openapi.seoul.go.kr:8088`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer test',
  },
});

export const userAxiosInstance = axios.create({
  baseURL: `http://172.18.0.10:7099`,
  headers: {
    'Content-Type': 'application/json',
  },
});
