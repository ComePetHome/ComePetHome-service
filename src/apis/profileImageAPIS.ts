import axios from 'axios';
import { userAxiosInstance } from './axiosInstance';

export const getUserImageAPI = async (userId: string) => {
  try {
    const headers = {
      userId: `${userId}`,
      'Content-Type': 'application/json',
    };
    const response = await userAxiosInstance.get(`/image/my-profile`, {
      headers,
    });
    console.log(response);
    return response.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }
    return null;
  }
};
