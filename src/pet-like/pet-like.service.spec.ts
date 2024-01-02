import { Test, TestingModule } from '@nestjs/testing';
import { PetLikeService } from './pet-like.service';
import { PetLikeRepository } from './pet-like.repository';
import { PetValidService } from '@/pets/pet-valid/pet-valid.service';
import { PetLike } from './pet-like.entity';

jest.mock('src/pets/pet.repository');
jest.mock('./pet-valid.service');
jest.mock('./pet-like.service');
describe('PetLikeService', () => {
  let service: PetLikeService;
  let repository: PetLikeRepository;
  let validService: PetValidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetLikeService],
    }).compile();

    service = module.get<PetLikeService>(PetLikeService);
    repository = module.get<PetLikeRepository>(PetLikeRepository);
    validService = module.get<PetValidService>(PetValidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
