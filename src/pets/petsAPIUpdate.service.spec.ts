import { Test, TestingModule } from '@nestjs/testing';
import { PetRepository } from './pet.repository';
import { PetsAPIService } from './petsAPIUpdate.service';

jest.mock('./pet.repository');
jest.mock('./petsAPIUpdate.service');

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

  describe('update pet data function', () => {
    it('', () => {});
  });

  describe('html parsing test', () => {
    it('html text만 가져오기', () => {
      const result = service.htmlParsing(
        '<p>회색과 하얀색 털이 적절하게 섞인 미묘, ‘루비’입니다.</p><p><br></p><p>한창 성장기라 밥도 잘 먹고 하루하루 잘 커가고 있어요.</p><p><br></p><p>루비는 요즘 한참 호기심이 많을 시기라, 고양이 놀이터 곳곳을 누비며 여기저기를 탐험합니다.</p><p><br></p><p>처음에는 경계하는 모습을 보이다가도 마음이 맞는 친구만 있으면</p><p><br></p><p>우당탕탕 뛰기도 하고 장난도 치는 루비에요.</p><p><br></p><p>친구와 노는 중에도 자기가 좋아하는 사람이 보이면 먼저 다가와서 골골송을 들려주는 천사냥이예요.</p><p><br></p><p>활동량이 많고 계속 놀아달라고 야옹거리는 루비와 함께 많은 시간을 보내주실 보호자님이 필요합니다.</p><p><br></p><p>자신이 마음을 연 사람에게는 한없이 애교냥이 되는 상냥한 루비.</p><p><br></p><p>처음 고양이를 가족으로 맞이하는 가정에도 적합한 아이에요.</p><p><br></p><p>사랑스런 루비의 평생가족을 기다립니다.</p>',
      );
      expect(result).toBe(
        '회색과 하얀색 털이 적절하게 섞인 미묘, ‘루비’입니다.한창 성장기라 밥도 잘 먹고 하루하루 잘 커가고 있어요.루비는 요즘 한참 호기심이 많을 시기라, 고양이 놀이터 곳곳을 누비며 여기저기를 탐험합니다.처음에는 경계하는 모습을 보이다가도 마음이 맞는 친구만 있으면우당탕탕 뛰기도 하고 장난도 치는 루비에요.친구와 노는 중에도 자기가 좋아하는 사람이 보이면 먼저 다가와서 골골송을 들려주는 천사냥이예요.활동량이 많고 계속 놀아달라고 야옹거리는 루비와 함께 많은 시간을 보내주실 보호자님이 필요합니다.자신이 마음을 연 사람에게는 한없이 애교냥이 되는 상냥한 루비.처음 고양이를 가족으로 맞이하는 가정에도 적합한 아이에요.사랑스런 루비의 평생가족을 기다립니다.',
      );
    });
  });

  describe('parsingString test', () => {
    it('이름(분양소) 문장 분리 테스트', () => {
      const { name, center } = service.parseString('이(주희)');
      expect(name).toBe('이');
      expect(center).toBe('주희');
    });

    it('이름만 왔을 때 분리 테스트', () => {
      const { name, center } = service.parseString('이주희');
      expect(name).toBe('이주희');
      expect(center).toBe(null);
    });
  });

  describe('fetching pet data', () => {
    it('데이터 존재 시 배열 반환', async () => {
      const offset = 1;
      const pageTerm = 10;
      expect(service.fetchPetData(offset, pageTerm)).toBeInstanceOf(Promise);
    });

    it('데이터 없을 시 undefined', async () => {
      const offset = 1000;
      const pageTerm = 10;
      expect(service.fetchPetData(offset, pageTerm)).resolves.toBeNull();
    });
  });
});
