export interface ICharacter {
  _id: string | null;
  firstName: string | null;
  lastName: string | null;
  nickname: string | null;
  birthYear: number | null;
  nationality: string | null;
  gender: string | null | undefined;
  species: string | null;
  actors: ICharacter[];
}
// TODO passer actors en IActor[] une fois implémenté
