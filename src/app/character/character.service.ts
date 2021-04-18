import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterResource } from '../common/resource/character/character.resource';
import { ICharacter } from './character.model';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {ICharacterDto} from '../common/resource/character/character.dto';

@Injectable()
export class CharacterService {

  constructor(
    private characterResource: CharacterResource
  ) { }

  getAllItems(): Observable<ICharacter[]> {
    return this.characterResource.findAll()
      .pipe(
        map((dtos: ICharacterDto[]) => {
          return dtos.map(dto => this.dtoToModel(dto));
        })
      );
  }

  getItem(id: number): Observable<ICharacter> {
    return this.characterResource.findOne(id)
      .pipe(
        map(dto => this.dtoToModel(dto))
      );
  }

  saveItem(characterDto: ICharacterDto): Observable<ICharacter> {
    const save$ = characterDto.id
      ? this.characterResource.update(characterDto)
      : this.characterResource.create(characterDto);
    return save$
      .pipe(
        map(dto => this.dtoToModel(dto))
      );
  }

  removeItem(id: number): Observable<any> {
    return this.characterResource.remove(id);
  }

  private dtoToModel(dto: ICharacterDto): ICharacter {
    return {
      id: dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthYear: dto.age ? moment().subtract(dto.age, 'year').year() : NaN
    };
  }

  private modelToDto(model: ICharacter): ICharacterDto {
    return {
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      age: model.birthYear ? moment().year() - model.birthYear : NaN
    };
  }
}
