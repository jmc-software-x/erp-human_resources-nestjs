import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './Dto/imputs/create-user.imputs';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: "userById", nullable: true })
  async findOneById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User | null> {
    return this.usersService.findOneById(id);
  }

  @Query(() => User, { name: "userByEmail", nullable: true })
  async findByEmail(
    @Args("email", { type: () => String }) email: string,
  ): Promise<User | null> {
    return this.usersService.findOneByEmail(email);
  }

  @Query(() => User, { name: "userByUsername", nullable: true })
  async findByUsername(
    @Args("username", { type: () => String }) username: string,
  ): Promise<User | null> {
    return this.usersService.findByUsername(username);
  }

  @Mutation(() => User)
  async register(
    @Args('Credenciales') data: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(data);
  }
}
