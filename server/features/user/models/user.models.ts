import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class SignUpRequestModel {
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  public password!: string;

  @IsNotEmpty()
  public firstName!: string;

  @IsNotEmpty()
  public lastName!: string;
}
export class SignUpResponseModel {
  public id!: number;
}

export class LogInRequestModel {
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  public password!: string;
}
export class LogInResponseModel {
  public id!: number;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
}
