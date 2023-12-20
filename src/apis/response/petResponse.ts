export interface PetResponse {
  list_total_count: number;
  RESULT: string;
  row: {
    ANIMAL_NO: number;
    NM: string;
    ENTRNC_DATE: string;
    SPCS: string;
    BREEDS: string;
    SEXDSTN: string;
    AGE: string;
    BDWGH: number;
    ADP_STTUS: string;
    TMPR_PRTC_STTUS: string;
    INTRCN_MVP_URL: string;
    INTRCN_CN: string;
    TMPR_PRTC_CN: string;
  }[];
}
