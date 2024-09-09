import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateBookmarkDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  workExperience: string;

  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @IsOptional()
  @IsString()
  memo: string;

  @IsNotEmpty()
  @IsString()
  deadline: string;
}
