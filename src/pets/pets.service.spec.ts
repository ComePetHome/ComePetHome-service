import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from './pets.service';
import { PetRepository } from './pet.repository';

jest.mock('./pet.repository');

describe('PetsService', () => {
  let service: PetsService;
  let petRepository: PetRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsService, PetRepository],
    }).compile();

    service = module.get<PetsService>(PetsService);
    petRepository = module.get<PetRepository>(PetRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
