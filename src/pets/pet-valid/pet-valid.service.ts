import { Injectable } from '@nestjs/common';
import { PetRepository } from '../pet.repository';
import { Pet } from '../pet.entity';
import { InvalidPetIdException } from '../exception/InvalidPetId.exception';

@Injectable()
export class PetValidService {
  constructor(private petRepository: PetRepository) {}

  async getPetByPetId(pet_id: number): Promise<Pet> {
    const pet: Pet = await this.petRepository.findOne({
      where: { pet_id: pet_id },
    });
    if (!pet) {
      throw new InvalidPetIdException();
    }
    return pet;
  }
}
