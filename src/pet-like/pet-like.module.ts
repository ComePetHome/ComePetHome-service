import { Module } from '@nestjs/common';
import { PetLikeController } from './pet-like.controller';
import { PetLikeService } from './pet-like.service';
import { PetLike } from './pet-like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetLikeRepository } from './pet-like.repository';
import { PetsModule } from '@/pets/pets.module';

@Module({
  imports: [TypeOrmModule.forFeature([PetLike]), PetsModule],
  controllers: [PetLikeController],
  providers: [PetLikeService, PetLikeRepository],
})
export class PetLikeModule {}
