import { DataSource, Repository } from 'typeorm';
import { SocialEnum } from './types/user';
import { User } from './user.entity';
import { KakaoUser } from './types/kakao';

export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(kakaoUser: KakaoUser) {
    const { id, connected_at, properties } = kakaoUser;
    const user = await this.findOne({
      where: { socialId: id, socialType: SocialEnum.kakao },
    });

    if (user) {
      return user;
    }

    const createUser = await this.create({
      nickname: properties.nickname,
      socialId: id,
      socialType: SocialEnum.kakao,
      registerAt: connected_at,
    });

    await this.save(createUser);

    return createUser;
  }
}
