import { Test, TestingModule } from '@nestjs/testing';
import { ContratoResolver } from './contrato.resolver';
import { ContratoService } from './contrato.service';

describe('ContratoResolver', () => {
  let resolver: ContratoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContratoResolver, ContratoService],
    }).compile();

    resolver = module.get<ContratoResolver>(ContratoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
