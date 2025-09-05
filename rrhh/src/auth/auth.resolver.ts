import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/auth-response.dto';
import { CreateUserInput } from '../users/Dto/imputs/create-user.imputs';
import { LoginInput } from 'auth/dto/inputs/login.input';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from './guards/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async register(
    @Args('data') data: CreateUserInput,
  ): Promise<AuthResponse> {
    return this.authService.register(data);
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('data') data: LoginInput,
  ): Promise<AuthResponse> {
    return this.authService.login(data.email, data.password);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
