import { Injectable } from '@nestjs/common';
import { PetLikeRepository } from './pet-like.repository';
import { PetLike } from './pet-like.entity';
import { Pet } from '@/pets/pet.entity';
import { PetValidService } from '@/pets/pet-valid/pet-valid.service';
import { LikeAlreadyExistsException } from '@/article-like/exception/LikeAlreadyExists.exception';

@Injectable()
export class PetLikeService {
  constructor(
    private petLikeRepository: PetLikeRepository,
    private readonly petValidService: PetValidService,
  ) {}

  async addLike(user_id: string, pet_id: number): Promise<PetLike> {
    const pet: Pet = await this.petValidService.getPetByPetId(pet_id);

    const like = await this.petLikeRepository.findOne({
      where: { user_id, pet: { id: pet_id } },
    });

    if (like) {
      throw new LikeAlreadyExistsException();
    } else {
      const petLike = this.petLikeRepository.create({
        user_id: user_id,
        pet: pet,
      });
      return await this.petLikeRepository.save(petLike);
    }
  }

  async removeLike(user_id: string, pet_id: number): Promise<void> {
    const petLike = await this.petLikeRepository.findOne({
      where: { user_id, pet: { id: pet_id } },
    });
    if (!petLike) {
      //Todo: 없다면 무시 처리 (다른 처리 가능)
      return;
    }
    await this.petLikeRepository.remove(petLike);
  }
}
