import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterResource } from '../common/resource/character/character.resource';
import { ICharacter } from './character.model';
import {map} from 'rxjs/operators';

@Injectable()
export class CharacterService {

  constructor(
    private characterResource: CharacterResource
  ) { }

  getAllItems(): Observable<ICharacter[]> {
    return this.characterResource.findAll()
      .pipe(
        map((characters: ICharacter[]) => {
          return characters;
        })
      );
  }

  getItem(id: string): Observable<ICharacter> {
    return this.characterResource.findOne(id);
  }

  saveItem(character: ICharacter): Observable<ICharacter> {
    const save$ = character.id
      ? this.characterResource.update(character)
      : this.characterResource.create(character);
    return save$;
  }

  removeItem(id: string): Observable<any> {
    return this.characterResource.remove(id);
  }
}
