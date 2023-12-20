import axios from 'axios';
import { petAxiosInstance } from './axiosInstance';
import { PetResponse } from './response/petResponse';

export const getPetsAPI = async (offset: number, pageTerm: number) => {
  try {
    //Todo : 페이지네이션 처리하기
    const response = await petAxiosInstance.get(
      `/${process.env.PET_API_KEY}/json/TbAdpWaitAnimalView/${offset}/${
        offset + pageTerm
      }/`,
    );
    const result = response.data.TbAdpWaitAnimalView.RESULT;
    if (result.CODE === 'INFO-000') {
      return response.data.TbAdpWaitAnimalView as PetResponse;
    } else {
      // 데이터 없거나 오류
      console.log('데이터 없거나 오류: ', result.MESSAGE);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }
    return null;
  }
};
