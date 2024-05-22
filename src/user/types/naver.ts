export interface NaverUserProfile {
  provider: 'naver';
  id: string;
  displayName: string;
  emails: { value: string }[];
  _json: {
    email: string;
    nickname: string;
    profile_image?: string;
    age?: number;
    birthday?: string;
    id: string;
  };
}
