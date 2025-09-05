import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AreaService } from './area.service';
import { Area } from './entities/area.entity';
import { CreateAreaInput } from './dto/create-area.input';
import { UpdateAreaInput } from './dto/update-area.input';

@Resolver(() => Area)
export class AreaResolver {
  constructor(private readonly areaService: AreaService) {}

  @Mutation(() => Area)
  createArea(@Args('createAreaInput') createAreaInput: CreateAreaInput) {
    return this.areaService.create(createAreaInput);
  }

  @Query(() => [Area], { name: 'areas' })
  findAll() {
    return this.areaService.findAll();
  }

  @Query(() => Area, { name: 'area' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.areaService.findOne(id);
  }

  @Mutation(() => Area)
  updateArea(@Args('updateAreaInput') updateAreaInput: UpdateAreaInput) {
    return this.areaService.update(updateAreaInput);
  }

  @Mutation(() => Area)
  removeArea(@Args('id', { type: () => Int }) id: string) {
    return this.areaService.remove(id);
  }

  @Mutation(() => Area)
  activateArea(@Args('id', { type: () => Int }) id: string) {
    return this.areaService.activate(id);
  }

  @Mutation(() => Area)
  deactivateArea(@Args('id', { type: () => Int }) id: string) {
    return this.areaService.deactivate(id);
  }
}

