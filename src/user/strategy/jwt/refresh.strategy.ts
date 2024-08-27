import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const refreshToken = req?.cookies['refreshToken'];

        if (!refreshToken) {
          return null;
        }

        return refreshToken;
      },
      secretOrKey: process.env.JWT_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload) {
    try {
      const { refreshToken } = req.cookies;

      const { userId } = payload;
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return user;
    } catch (error) {
      console.error('Validate function error:', error);
      throw error;
    }
  }
}
