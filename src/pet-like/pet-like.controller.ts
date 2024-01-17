import { Controller, Delete, Param, Post } from '@nestjs/common';
import { PetLikeService } from './pet-like.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('pets/like')
@ApiTags('PetLike')
export class PetLikeController {
  constructor(private petLikeService: PetLikeService) {}

  @Post('/:userId/:petId')
  @ApiOperation({ summary: '유기동물 좋아요 추가' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: '사용자 id',
  })
  @ApiParam({
    name: 'petId',
    type: Number,
    description: '동물 번호(pet_id)',
  })
  async addLike(
    @Param('userId') userId: string,
    @Param('petId') petId: number,
  ) {
    return this.petLikeService.addLike(userId, petId);
  }

  @Delete('/:userId/:petId')
  @ApiOperation({ summary: '유기동물 좋아요 추가' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: '사용자 id',
  })
  @ApiParam({
    name: 'petId',
    type: Number,
    description: '동물 번호(pet_id)',
  })
  @ApiOperation({ summary: '유기동물 좋아요 제거' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: '사용자 id',
  })
  @ApiParam({
    name: 'petId',
    type: Number,
    description: '동물 번호(pet_id)',
  })
  async deleteLike(
    @Param('userId') userId: string,
    @Param('petId') petId: number,
  ) {
    this.petLikeService.removeLike(userId, petId);
  }
}
