import axios from 'axios';
import { petAxiosInstance } from './axiosInstance';
import { PetImageResponse } from './response/petImageResponse';

export const getPetsImageAPI = async (offset: number, pageTerm: number) => {
  try {
    const response = await petAxiosInstance.get(
      `/${
        process.env.PET_IMAGE_API_KEY
      }/json/TbAdpWaitAnimalPhotoView/${offset}/${offset + pageTerm}/`,
    );
    const result = response.data.TbAdpWaitAnimalPhotoView.RESULT;
    if (result.CODE === 'INFO-000') {
      return response.data.TbAdpWaitAnimalPhotoView as PetImageResponse;
    } else {
      // 데이터 없거나 오류
      console.log('펫 이미지 데이터 없거나 오류: ', result.MESSAGE);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }
    return null;
  }
};
