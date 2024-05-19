import { SocialEnum } from 'src/user/types/user';

export interface OAuthUserResponse {
  socialId: number | string;
  registeredAt: string;
  nickname: string;
  email?: string;
  type: keyof typeof SocialEnum;
}
