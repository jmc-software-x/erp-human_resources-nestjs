import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CargoService } from './cargo.service';
import { Cargo } from './entities/cargo.entity';
import { CreateCargoInput } from './dto/create-cargo.input';
import { UpdateCargoInput } from './dto/update-cargo.input';

@Resolver(() => Cargo)
export class CargoResolver {
  constructor(private readonly cargoService: CargoService) {}

  @Mutation(() => Cargo)
  createCargo(@Args('data') data: CreateCargoInput) {
    return this.cargoService.create(data);
  }

  @Query(() => [Cargo])
  findAllCargos() {
    return this.cargoService.findAll();
  }

  @Query(() => Cargo)
  findOneCargo(@Args('id', { type: () => Int }) id: number) {
    return this.cargoService.findOne(id);
  }

  @Mutation(() => Cargo)
  updateCargo(@Args('id', { type: () => Int }) id: number, @Args('data') data: UpdateCargoInput) {
    return this.cargoService.update(id, data);
  }

  @Mutation(() => Cargo)
  removeCargo(@Args('id', { type: () => Int }) id: number) {
    return this.cargoService.remove(id);
  }

  @Mutation(() => Cargo)
  disableCargo(@Args('id', { type: () => Int }) id: number) {
    return this.cargoService.disable(id);
  }
}
