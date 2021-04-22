export interface ICharacter {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  nickname: string | null;
  birthYear: number | null;
  gender: Gender | null;
  species: string | null;
  actor: string | null;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
  HelicoptereDeCombat = 'Helicoptere de combat'
}

export enum CharacterItemAttribute {
  id = 'ID',
  firstName = 'FIRST_NAME',
  lastName = 'LAST_NAME',
  birthYear = 'BIRTH_YEAR'
}
