import { Test, TestingModule } from '@nestjs/testing';
import { PetValidService } from './pet-valid.service';
import { PetRepository } from '../pet.repository';
import { Pet } from '../pet.entity';

jest.mock('./pet.repository');
jest.mock('./pet-valid.service');

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
    it('가져오기 성공', async () => {
      const mockPet: Pet = {
        id: 1,
        pet_id: 123, // 예시로 사용할 값
        name: 'Buddy',
        center: 'Some Center',
        enlistment_date: new Date('2022-01-01'), // 예시로 사용할 값
        species: 'Dog',
        breeds: 'Golden Retriever',
        sex: 'Male',
        age: 'Adult',
        weight: 25.5, // 예시로 사용할 값
        adp_status: 'Adoptable',
        temporary_protection_status: 'Protected',
        intro_url: 'https://example.com/image.jpg',
        intro_contents: 'This is Buddy, a friendly dog.',
        temporary_protection_contents: 'Temporary protection information',
        thumbnail_url: 'https://example.com/thumbnail.jpg',
        likes: [], // OneToMany 관계인 likes 필드는 빈 배열로 초기화
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockPet);
      const result = await service.getPetByPetId(1);
      expect(result).toEqual(mockPet);
    });

    it('가져오기 실패', () => {});
  });
});
