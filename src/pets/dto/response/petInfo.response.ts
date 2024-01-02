import { ApiProperty } from '@nestjs/swagger';
import { PetListItemResponse } from './petListItem.response';
import { Expose } from 'class-transformer';

export class PetInfoResponse extends PetListItemResponse {
  @Expose()
  @ApiProperty({
    example: '강아지, 고양이',
    description: '종',
  })
  species: string;

  @Expose()
  @ApiProperty({
    example: '3.14',
    description: '무게',
  })
  weight: number;

  @Expose()
  temporary_protection_status: string;

  @Expose()
  @ApiProperty({
    description: '소개 영상 url, 유튜브 링크',
  })
  intro_url: string;

  @Expose()
  @ApiProperty({
    description: '소개글, txt',
  })
  intro_contents: string;

  @Expose()
  temporary_protection_contents: string;

  @Expose()
  @ApiProperty({
    description: '소개 영상 url, 유튜브 링크',
  })
  thumbnail_url?: string | null;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
