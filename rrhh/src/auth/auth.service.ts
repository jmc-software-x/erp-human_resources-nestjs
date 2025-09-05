import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthResponse } from './types/auth-response.dto';
import { CreateUserInput } from '../users/Dto/imputs/create-user.imputs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateUserInput): Promise<AuthResponse> {
    const user = await this.usersService.create(data);
    const token = this.generateToken(user.id, user.email, user.username);

    return {
      accessToken: token,
      user,
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.usersService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const token = this.generateToken(user.id, user.email, user.username);

    return {
      accessToken: token,
      user,
    };
  }

  private generateToken(userId: string, email: string, username: string): string {
    return this.jwtService.sign({
      sub: userId,
      id: userId,
      email,
      username,
    });
  }
}
