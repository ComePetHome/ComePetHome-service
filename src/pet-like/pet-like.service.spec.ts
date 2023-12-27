import { Test, TestingModule } from '@nestjs/testing';
import { PetLikeService } from './pet-like.service';

describe('PetLikeService', () => {
  let service: PetLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetLikeService],
    }).compile();

    service = module.get<PetLikeService>(PetLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
