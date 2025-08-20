import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from '../users/Dto/imputs/login.input';
import { CreateUserInput } from '../users/Dto/imputs/create-user.imputs';
import { AuthResponse } from './Dto/auth-response.dto';

@Resolver(()=>AuthResponse)
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
}
