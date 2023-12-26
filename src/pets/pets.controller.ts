import { Controller, Get, Query } from '@nestjs/common';
import { PetsAPIService } from './petsAPIUpdate.service';
import {
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PetListItemResponse } from './dto/response/petListItem.response';
import { PetsService } from './pets.service';

@Controller('pets')
@ApiTags('Pet')
export class PetsController {
  constructor(
    private petsAPIService: PetsAPIService,
    private petsService: PetsService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: '유기동물 리스트 가져오기' })
  @ApiQuery({
    name: 'pageNumber',
    required: false,
    type: Number,
    description: '페이지 번호 (기본값: 0)',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: PetListItemResponse,
    isArray: true,
  })
  getPetData(
    @Query('pageNumber')
    pageNumber: number = 0,
  ): Promise<PetListItemResponse[]> {
    //Todo : 데이터 업데이트 스케줄러로 빼기
    // this.petsAPIService.updatePetData();
    // this.petsAPIService.updatePetImageData();

    return this.petsService.getAllPetList((pageNumber = pageNumber));
  }
}
