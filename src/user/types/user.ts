export enum SocialEnum {
  kakao = 'kakao',
  naver = 'naver',
  google = 'google',
}

export interface CreateUser {
  nickname: string;
  socialId: number;
  registerAt: Date;
}
