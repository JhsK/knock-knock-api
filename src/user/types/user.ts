export interface CreateUser {
  nickname: string;
  socialId: number;
  registerAt: Date;
}

export type UserProvider = 'kakao' | 'naver' | 'google';
