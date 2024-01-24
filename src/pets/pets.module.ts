import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller-read';
import { PetsService } from './pets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PetRepository } from './pet.repository';
import { PetsAPIService } from './petsAPIUpdate.service';
import { PetValidService } from './pet-valid/pet-valid.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetsController],
  providers: [PetsService, PetRepository, PetsAPIService, PetValidService],
  exports: [PetValidService, PetRepository],
})
export class PetsModule {}
