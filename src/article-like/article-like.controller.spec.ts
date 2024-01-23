import { Test, TestingModule } from '@nestjs/testing';
import { ArticleLikeController } from './article-like.controller';

describe('ArticleLikeController', () => {
  let controller: ArticleLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleLikeController],
    }).compile();

    controller = module.get<ArticleLikeController>(ArticleLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
