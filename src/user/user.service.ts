import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from './dto/request/login.request';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from 'src/constant';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async login(loginRequest: LoginRequest) {
    const { id, name, provider, registerAt } = loginRequest;

    return this.dataSource.transaction(async (manager) => {
      const userRepository = manager.getRepository(User);
      const user = await userRepository.findOne({
        where: { providerId: id, provider },
      });

      if (user) {
        const payload = { userId: user.id, provider };
        const accessToken = await this.jwtService.signAsync(payload, {
          expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
          expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        });

        await this.userRepository.update(user.id, { refreshToken });

        return { accessToken, refreshToken };
      }

      const createUser = await userRepository.create({
        nickname: name,
        providerId: id,
        provider,
        registerAt,
      });

      const createdUser = await this.userRepository.save(createUser);

      const payload = { userId: createUser.id, provider };
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      });

      await this.userRepository.update(createdUser.id, { refreshToken });

      return {
        accessToken,
        refreshToken,
      };
    });
  }

  async refreshAccessToken(user: User) {
    const newAccessToken = this.jwtService.sign(
      { userId: user.id, provider: user.provider },
      {
        secret: process.env.JWT_TOKEN_SECRET,
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      },
    );

    return newAccessToken;
  }
}
