import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import {
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from 'nestjs-api-forge';
import { LoginCredential } from './entities/login-credential.entity';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(LoginCredential)
    private readonly credentialRepo: Repository<LoginCredential>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const credential = await this.credentialRepo.findOne({
      where: { username: dto.username },
      relations: ['roleDetail'],
    });

    if (!credential) throw new UnauthorizedException('Invalid credentials');
    if (!credential.active)
      throw new UnauthorizedException('Account is deactivated');

    const isMatch = await bcrypt.compare(dto.password, credential.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    await this.credentialRepo.update(credential.id, { lastLogin: new Date() });

    const payload = {
      sub: credential.userId,
      username: credential.username,
      role: credential.role,
      credentialId: credential.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: (this.configService.get<string>('jwt.refreshExpiresIn') ||
          '30d') as any,
      }),
      user: {
        id: credential.userId,
        username: credential.username,
        role: credential.role,
        roleName: credential.roleDetail?.name,
      },
    };
  }

  refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });
      const newPayload = {
        sub: payload.sub,
        username: payload.username,
        role: payload.role,
        credentialId: payload.credentialId,
      };
      return {
        accessToken: this.jwtService.sign(newPayload),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async changePassword(credentialId: number, dto: ChangePasswordDto) {
    const credential = await this.credentialRepo.findOne({
      where: { id: credentialId },
    });
    if (!credential) throw new NotFoundException('Credential not found');

    const isMatch = await bcrypt.compare(
      dto.currentPassword,
      credential.password,
    );
    if (!isMatch)
      throw new BadRequestException('Current password is incorrect');

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.credentialRepo.update(credentialId, { password: hashed });
  }

  async getProfile(userId: number, role: number) {
    const credential = await this.credentialRepo.findOne({
      where: { userId, role },
      relations: ['roleDetail'],
    });
    if (!credential) throw new NotFoundException('Profile not found');
    return {
      id: credential.userId,
      username: credential.username,
      role: credential.role,
      roleName: credential.roleDetail?.name,
      lastLogin: credential.lastLogin,
    };
  }
}
