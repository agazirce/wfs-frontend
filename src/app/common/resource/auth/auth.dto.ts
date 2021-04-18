export interface IAuthCredentialsDto {
  login: string;
  pwd: string;
}

export interface IAuthTokenDto {
  token: string;
}

export enum UserRole {
  member = 'MEMBER',
  admin = 'ADMIN'
}

export interface IAuthMeDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

