import { Test, TestingModule } from '@nestjs/testing';
import { PetRepository } from './pet.repository';
import { PetsAPIService } from './petsAPIUpdate.service';

jest.mock('./pet.repository');

describe('PetsService', () => {
  let service: PetsAPIService;
  let petRepository: PetRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsAPIService, PetRepository],
    }).compile();

    service = module.get<PetsAPIService>(PetsAPIService);
    petRepository = module.get<PetRepository>(PetRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
