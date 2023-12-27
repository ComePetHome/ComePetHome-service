import { Module } from '@nestjs/common';
import { PetLikeController } from './pet-like.controller';
import { PetLikeService } from './pet-like.service';

@Module({
  controllers: [PetLikeController],
  providers: [PetLikeService],
})
export class PetLikeModule {}
