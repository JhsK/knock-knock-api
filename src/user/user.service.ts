import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from './dto/request/login.request';

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
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
        });

        return { accessToken, refreshToken };
      }

      const createUser = await userRepository.create({
        nickname: name,
        providerId: id,
        provider,
        registerAt,
      });

      await this.userRepository.save(createUser);

      const payload = { userId: createUser.id, provider };
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      });

      return {
        accessToken,
        refreshToken,
      };
    });
  }
}
