export interface CreateUser {
  nickname: string;
  socialId: number;
  registerAt: Date;
}

export type UserProvider = 'kakao' | 'naver' | 'google';

export interface TokenPayload {
  userId: number;
  provider: UserProvider;
  iat: number;
  exp: number;
}
