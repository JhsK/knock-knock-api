import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleLoginRequest {
  @IsNotEmpty()
  @IsString()
  code: string;
}
