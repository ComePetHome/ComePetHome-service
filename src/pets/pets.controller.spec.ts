import { Test, TestingModule } from '@nestjs/testing';
import { PetsController } from './pets.controller-read';
import { PetsAPIService } from './petsAPIUpdate.service';

jest.mock('./petsAPIUpdate.service');

describe('PetsController', () => {
  let controller: PetsController;
  let service: PetsAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [PetsAPIService],
    }).compile();

    controller = module.get<PetsController>(PetsController);
    service = module.get<PetsAPIService>(PetsAPIService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
