export interface IUser {
  _id: string | null;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  birthDate: number | null;
  email: string | null;
  password: string | null;
  gender: string | null | undefined;
  role: string | null | undefined;
}
