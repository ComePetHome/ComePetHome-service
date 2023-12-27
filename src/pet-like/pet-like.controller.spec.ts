import { Test, TestingModule } from '@nestjs/testing';
import { PetLikeController } from './pet-like.controller';

describe('PetLikeController', () => {
  let controller: PetLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetLikeController],
    }).compile();

    controller = module.get<PetLikeController>(PetLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
