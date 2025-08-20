import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './Dto/imputs/create-user.imputs';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

@Query(() => String)
  hello() {
    return 'Hello GraphQL';
  }
  
  @Mutation(() => User)
  async register(
    @Args('data') data: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(data);
  }
}
