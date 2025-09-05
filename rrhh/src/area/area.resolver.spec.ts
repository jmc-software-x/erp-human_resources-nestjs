import { Test, TestingModule } from '@nestjs/testing';
import { AreaResolver } from './area.resolver';
import { AreaService } from './area.service';

describe('AreaResolver', () => {
  let resolver: AreaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaResolver, AreaService],
    }).compile();

    resolver = module.get<AreaResolver>(AreaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
