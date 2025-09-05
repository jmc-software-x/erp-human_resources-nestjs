import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { Personal } from './entities/personal.entity';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { GqlAuthGuard } from 'auth/guards/gql-auth.guard';
import { CurrentUser } from 'auth/guards/current-user.decorator';
import { User } from '@users/entities/user.entity';

@Resolver(() => Personal)
export class PersonalResolver {
  constructor(private readonly personalService: PersonalService) {}

  @Query(() => [Personal])
  personals() {
    return this.personalService.findAll();
  }

  @Query(() => Personal)
  personal(@Args('id', { type: () => String }) id: string) {
    return this.personalService.findOne(id);
  }

  @Query(() => Personal, { nullable: true })
  PersonalPorDni(
    @Args('dni', { type: () => String }) dni: string,
  ) {
    return this.personalService.findByDni(dni);
  }

  @Mutation(() => Personal)
  @UseGuards(GqlAuthGuard)
  createPersonal(
    @Args('data') data: CreatePersonalDto,
    @CurrentUser() user: User,
  ) {
    return this.personalService.create(data, user.id);
  }

  @Mutation(() => Personal)
  updatePersonal(
    @Args('id', { type: () => String }) id: string,
    @Args('data') data: UpdatePersonalDto,
  ) {
    return this.personalService.update(id, data);
  }

  @Mutation(() => Personal)
  removePersonal(@Args('id', { type: () => String }) id: string) {
    return this.personalService.remove(id);
  }

  @Mutation(() => Personal)
  disablePersonal(@Args('id', { type: () => String }) id: string) {
    return this.personalService.disable(id);
  }
}
