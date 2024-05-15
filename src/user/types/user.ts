export enum SocialEnum {
  kakao,
  naver,
  google,
}

export interface CreateUser {
  nickname: string;
  socialId: number;
  registerAt: Date;
}
