import { IsNotEmpty, IsString } from 'class-validator';

export class NaverLoginRequest {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  tokenType: string;

  @IsNotEmpty()
  @IsString()
  expiresIn: string;
}
