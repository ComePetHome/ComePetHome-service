import { Controller, Delete, Headers, Param, Post } from '@nestjs/common';
import { PetLikeService } from './pet-like.service';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('command/pets/like')
@ApiTags('PetLike')
export class PetLikeController {
  constructor(private petLikeService: PetLikeService) {}

  @Post('/:petId')
  @ApiOperation({ summary: '유기동물 좋아요 추가' })
  @ApiHeader({
    name: 'userId',
    description: 'User ID (Optional)',
    required: false,
  })
  @ApiParam({
    name: 'petId',
    type: Number,
    description: '동물 번호(pet_id)',
  })
  async addLike(
    @Headers('userId') userId: string,
    @Param('petId') petId: number,
  ) {
    return this.petLikeService.addLike(userId, petId);
  }

  @Delete('/:petId')
  @ApiOperation({ summary: '유기동물 좋아요 추가' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: '사용자 id',
  })
  @ApiHeader({
    name: 'userId',
    description: 'User ID (Optional)',
    required: false,
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
    @Headers('userId') userId: string,
    @Param('petId') petId: number,
  ) {
    this.petLikeService.removeLike(userId, petId);
  }
}
