import { Controller, Get, Param, Query } from '@nestjs/common';
import { PetsAPIService } from './petsAPIUpdate.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PetListItemResponse } from './dto/response/petListItem.response';
import { PetsService } from './pets.service';
import { PetInfoResponse } from './dto/response/petInfo.response';

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

  @Get('/:petId')
  @ApiOperation({ summary: '유기동물 조회 페이지 세부정보 조회' })
  @ApiParam({
    name: 'petId',
    type: Number,
    description: '동물 번호(pet_id)',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: PetInfoResponse,
    isArray: false,
  })
  getPetInfo(@Param('petId') petId: number): Promise<PetInfoResponse> {
    return this.petsService.getPetInfo(petId);
  }
}
