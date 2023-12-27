import { Injectable } from '@nestjs/common';
import { PetRepository } from './pet.repository';
import { Pet } from './pet.entity';
import { PetListItemResponse } from './dto/response/petListItem.response';
import { plainToClass } from 'class-transformer';
import { PetInfoResponse } from './dto/response/petInfo.response';
import { InvalidPetIdException } from './exception/InvalidPetId.exception';

@Injectable()
export class PetsService {
  constructor(private petRepository: PetRepository) {}

  async getAllPetList(
    pageNumber: number = 0,
    pageSize: number = 10,
  ): Promise<PetListItemResponse[]> {
    const skip = pageNumber * pageSize;

    const pets: PetListItemResponse[] = (
      await this.petRepository
        .createQueryBuilder('pet')
        .orderBy('pet.enlistment_date', 'DESC') // enlistment_date 기준으로 내림차순으로 정렬 (필요에 따라 변경 가능)
        .skip(skip)
        .take(pageSize)
        .getMany()
    ).map((pet) =>
      plainToClass(PetListItemResponse, pet, {
        excludeExtraneousValues: true,
      }),
    );
    return pets;
  }

  async getPetInfo(pet_id: number): Promise<PetInfoResponse> {
    const pet: Pet = await this.petRepository.findOne({
      where: { pet_id: pet_id },
    });

    if (!pet) {
      throw new InvalidPetIdException();
    }

    return plainToClass(PetInfoResponse, pet, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async findByPetId(pet_id: number): Promise<Pet | undefined> {
    return this.petRepository.findOne({ where: { pet_id: pet_id } });
  }
}
