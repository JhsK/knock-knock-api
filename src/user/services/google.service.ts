import { Injectable } from '@nestjs/common';
import { GoogleLoginRequest } from '../dto/google/google-login.request';
import { OAuthTokenResponse } from '../dto/oauth/token.response';
import { OAuthUserResponse } from '../dto/oauth/user.response';
import { OAuthAttributes } from '../interface/oauth.interface';

@Injectable()
export class GoogleService implements OAuthAttributes<GoogleLoginRequest> {
  getToken?: (loginDto: GoogleLoginRequest) => Promise<OAuthTokenResponse>;
  // async getToken(
  //   googleLoginRequest: GoogleLoginRequest,
  // ): Promise<OAuthTokenResponse> {
  //   const { code } = googleLoginRequest;
  //   try {
  //     const response = await fetch('https://oauth2.googleapis.com/token', {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       method: 'POST',
  //       body: new URLSearchParams({
  //         client_id: process.env.GOOGLE_CLIENT_ID,
  //         client_secret: process.env.GOOGLE_SECRET_ID,
  //         redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  //         grant_type: 'authorization_code',
  //         code,
  //       }).toString(),
  //     });

  //     const data: GoogleTokenResponse = await response.json();

  //     return {
  //       accessToken: data.access_token,
  //       expiresAt: data.expires_in,
  //       refreshToken: data.refresh_token,
  //       refreshTokenExpiresAt: data.expires_in,
  //     };
  //   } catch (err) {
  //     throw new BadRequestException('구글 API에서 문제가 발생하였습니다');
  //   }
  // }
  getUser: (accessToken: string) => Promise<OAuthUserResponse>;
}
