import { ICharacter } from "../character/character.model";

export interface IMovie {
  _id: string | null;
  title: string;
  affiche: string;
  genre: string;
  year: number;
  realisator: string;
  duration: number;
  preview: string;
  characters: ICharacter[];
}
