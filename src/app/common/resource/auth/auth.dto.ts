export interface IAuthCredentialsDto {
  email: string;
  password: string;
}

export interface IAuthTokenDto {
  token: string;
}

export enum UserRole {
  member = 'MEMBER',
  admin = 'ADMIN'
}

export interface IAuthMeDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

