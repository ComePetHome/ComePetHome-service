import { Injectable } from '@nestjs/common';
import { PetRepository } from './pet.repository';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(private petRepository: PetRepository) {}

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async findByPetId(pet_id: number): Promise<Pet | undefined> {
    return this.petRepository.findOne({ where: { pet_id: pet_id } });
  }
}
