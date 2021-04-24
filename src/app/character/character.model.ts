export interface ICharacter {
  _id: string | null;
  firstName: string | null;
  lastName: string | null;
  nickname: string | null;
  birthYear: number | null;
  nationality: string | null;
  gender: Gender | null;
  species: string | null;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
  HelicoptereDeCombat = 'Helicoptere de combat'
}
