import { Controller, Get } from '@nestjs/common';
import { PetsAPIService } from './petsAPIUpdate.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({
    status: 200,
    description: 'success',
    type: PetListItemResponse,
    isArray: true,
  })
  getPetData(): Promise<PetListItemResponse[]> {
    //Todo : 데이터 업데이트 스케줄러로 빼기
    // this.petsAPIService.updatePetData();
    // this.petsAPIService.updatePetImageData();

    return this.petsService.getAllPetList();
  }
}
