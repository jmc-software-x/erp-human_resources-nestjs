import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContratoService } from './contrato.service';
import { Contrato } from './entities/contrato.entity';
import { CreateContratoInput } from './dto/inputs/create-Contrato.input';
import { UpdateContratoInput } from './dto/inputs/update-Contrato.input';

@Resolver(() => Contrato)
export class ContratoResolver {
  constructor(private readonly contratoService: ContratoService) {}

 
  @Mutation(() => Contrato)
  createContrato(
    @Args('createContratoInput') createContratoInput: CreateContratoInput,
  ) {
    return this.contratoService.createContrato(createContratoInput);
  }

  @Query(() => [Contrato], { name: 'contratos' })
  findAll() {
    return this.contratoService.findContratos();
  }

  @Query(() => Contrato, { name: 'contrato' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.contratoService.findContrato(id);
  }

  @Mutation(() => Contrato)
  updateContrato(
    @Args('id', { type: () => String }) id: string,
    @Args('updateContratoInput') updateContratoInput: UpdateContratoInput,
  ) {
    return this.contratoService.update(id, updateContratoInput);
  }



  @Mutation(() => Contrato)
  disableContrato(@Args('id', { type: () => String }) id: string) {
    return this.contratoService.disable(id);
  }
}
