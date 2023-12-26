import { ApiProperty } from '@nestjs/swagger';

export class PetListItemResponse {
  @ApiProperty({
    description: '아이디',
  })
  id: number;
  @ApiProperty({
    description: '유기동물 이름',
  })
  name: string;
  @ApiProperty({
    example: '마포센터',
    description: '마포센터-임시보호가능 으로 들어올 수 있음',
  })
  center: string;
  @ApiProperty({
    description: '등록 날짜',
  })
  enlistment_date: Date;
  @ApiProperty({
    example: '웰시코기,,,',
    description: '품종',
  })
  breeds: string;
  @ApiProperty({
    example: 'M,N',
    description: '성별',
  })
  sex: string;
  @ApiProperty({
    example: '3(세) 4(개월)',
    description: '나이-파싱해서 사용해야함',
  })
  age: string;
  @ApiProperty({
    example: 'N,P',
    description: '입양 상태',
  })
  adp_status: string;
}
