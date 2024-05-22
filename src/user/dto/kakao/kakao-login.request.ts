import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SocialEnum } from 'src/user/types/user';

export class KakaoLoginRequest {
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
  @IsEnum(SocialEnum)
  socialType: SocialEnum;

  @IsDateString()
  registerAt: string;
}
