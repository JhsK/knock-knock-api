export interface KakaoToken {
  token_type: 'bearer';
  access_token: string;
  id_token?: string;
  expires_at: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope?: string;
}
export interface KakaoUser {
  id: number;
  connected_at: string;
  properties: { nickname: string };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile: {
      nickname: string;
      is_default_nickname: boolean;
    };
  };
}

export interface KakaoUserProfile {
  provider: 'kakao';
  id: number;
  username: string;
  displayName: string;
  _raw: string;
  _json: {
    id: number;
    connected_at: string;
    properties: { nickname: string };
    kakao_account: {
      profile_nickname_needs_agreement: boolean;
      profile: object;
    };
  };
}
