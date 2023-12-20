export interface PetImageResponse {
  list_total_count: number;
  RESULT: string;
  row: {
    ANIMAL_NO: number;
    PHOTO_KND: string;
    PHOTO_NO: number;
    PHOTO_URL: string;
  }[];
}
