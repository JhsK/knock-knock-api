import { IsDateString, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { UserProvider } from 'src/user/types/user';

export class LoginRequest {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsIn(['kakao', 'naver', 'google'])
  provider: UserProvider;

  @IsDateString()
  registerAt: string;
}
