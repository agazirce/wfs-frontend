export interface ICharacter {
  id: number | null;
  firstName: string;
  lastName: string;
  birthYear: number;
}

export enum CharacterItemAttribute {
  id = 'ID',
  firstName = 'FIRST_NAME',
  lastName = 'LAST_NAME',
  birthYear = 'BIRTH_YEAR'
}
