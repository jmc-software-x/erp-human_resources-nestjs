import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { Personal } from './entities/personal.entity';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { GqlAuthGuard } from 'auth/guards/gql-auth.guard.';
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
  personal(@Args('id', { type: () => Int }) id: number) {
    return this.personalService.findOne(id);
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
  updatePersonal(@Args('data') data: UpdatePersonalDto) {
    return this.personalService.update(data);
  }

@Mutation(() => Personal)
async removePersonal(@Args('id', { type: () => Int }) id: number) {
  return this.personalService.remove(id);
}
}
