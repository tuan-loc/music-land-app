import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Role } from 'src/commons/enums/role.enum';
import { EntityRepository, Repository } from 'typeorm';
import { EmailLoginDto } from '../dto/email-login.dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User> {
    return await this.findOne({ email });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.findOne({ username });
  }

  async validateUserPassword(emailLoginDto: EmailLoginDto) {
    const { email, password } = emailLoginDto;
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User does not exist in the database');
    }
    if (user && (await user.validatePassword(password))) {
      return { email, user };
    } else {
      throw new BadRequestException(
        'Your password is inccorrect, please enter another one',
      );
    }
  }

  async validateAdminPassword(emailLoginDto: EmailLoginDto) {
    const { email, password } = emailLoginDto;
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User does not exist in the database');
    }
    const isAdmin = (): boolean => user.roles.some(role => role === Role.ADMIN);
    if (!isAdmin()) {
      throw new ForbiddenException('This user does not has admin role');
    }
    if (user && (await user.validatePassword(password))) {
      return { email, user };
    } else {
      throw new BadRequestException(
        'Your password is incorrect, please enter another one',
      );
    }
  }
}
