import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, await bcrypt.genSalt(10));
  }

  async comparePasswords(password1: string, password2: string): Promise<boolean> {
    return await bcrypt.compare(password1, password2);
  }

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(data.password); // 10 is the salt rounds
    return this.prisma.user.create({
      data: {
        name: data.name,
        password: hashedPassword,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { deletedAt: null }, // Only fetch users that are not soft-deleted
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null, // Exclude soft-deleted users
      },
    });
  }

  async findOneByName(name: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        name,
        deletedAt: null, // Exclude soft-deleted users
      },
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const updateData: any = { ...data };
    if (data.password) {
      updateData.password = await this.hashPassword(data.password); // Hash new password
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() }, // Set deletedAt to soft-delete
    });
  }
}
