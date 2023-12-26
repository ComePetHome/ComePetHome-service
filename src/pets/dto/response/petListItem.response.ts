import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PetListItemResponse {
  @ApiProperty({
    description: '아이디',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: '유기동물 이름',
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: '마포센터',
    description: '마포센터-임시보호가능 으로 들어올 수 있음',
  })
  @Expose()
  center: string;

  @ApiProperty({
    description: '등록 날짜',
  })
  @Expose()
  enlistment_date: Date;

  @ApiProperty({
    example: '웰시코기,,,',
    description: '품종',
  })
  @Expose()
  breeds: string;

  @ApiProperty({
    example: 'M,N',
    description: '성별',
  })
  @Expose()
  sex: string;

  @ApiProperty({
    example: '3(세) 4(개월)',
    description: '나이-파싱해서 사용해야함',
  })
  @Expose()
  age: string;

  @ApiProperty({
    example: 'N,P',
    description: '입양 상태',
  })
  @Expose()
  adp_status: string;
}
