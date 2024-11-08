import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }

  async login(data: LoginDto): Promise<{ user: any, accessToken: string }> {
    // Fetch the user by name
    const user = await this.prisma.user.findUnique({ where: { name: data.name } });

    // Check if user exists and if the password is correct
    if (!user || !(await this.userService.comparePasswords(data.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create JWT payload
    const payload = { userId: user.id, name: user.name };

    // Generate JWT token
    const accessToken = this.jwtService.sign(payload);

    return { user: { ...user, password: undefined }, accessToken };
  }
}
