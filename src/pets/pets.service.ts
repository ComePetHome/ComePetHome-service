import { Injectable } from '@nestjs/common';
import { PetRepository } from './pet.repository';
import { Pet } from './pet.entity';
import { PetListItemResponse } from './dto/response/petListItem.response';

@Injectable()
export class PetsService {
  constructor(private petRepository: PetRepository) {}

  async getAllPetList(): Promise<PetListItemResponse[]> {
    const pets: PetListItemResponse[] = (await this.petRepository.find()).map(
      (pet) => ({
        id: pet.id,
        name: pet.name,
        center: pet.center,
        enlistment_date: pet.enlistment_date,
        breeds: pet.breeds,
        sex: pet.sex,
        age: pet.age,
        adp_status: pet.adp_status,
      }),
    );
    return pets;
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async findByPetId(pet_id: number): Promise<Pet | undefined> {
    return this.petRepository.findOne({ where: { pet_id: pet_id } });
  }
}
