import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PetRepository } from './pet.repository';
import { PetsAPIService } from './petsAPIUpdate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetsController],
  providers: [PetsService, PetRepository, PetsAPIService],
})
export class PetsModule {}
