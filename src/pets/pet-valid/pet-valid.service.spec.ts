import { Test, TestingModule } from '@nestjs/testing';
import { PetValidService } from './pet-valid.service';
import { PetRepository } from '../pet.repository';

describe('PetValidService', () => {
  let service: PetValidService;
  let repository: PetRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetValidService],
    }).compile();

    service = module.get<PetValidService>(PetValidService);
    repository = module.get<PetRepository>(PetRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('petId로 pet 가져오기 테스트', () => {
    it('가져오기 성공', () => {});

    it('가져오기 실패', () => {});
  });
});
