import { Controller, Get } from '@nestjs/common';
import { PetsAPIService } from './petsAPIUpdate.service';

@Controller('pets')
export class PetsController {
  constructor(private petsAPIService: PetsAPIService) {}

  @Get('/')
  getPetData() {
    this.petsAPIService.updatePetData();
    this.petsAPIService.updatePetImageData();
  }
}
