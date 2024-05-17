import { IsNotEmpty } from 'class-validator';

export class KakaoLoginRequest {
  @IsNotEmpty()
  code: string;
}
