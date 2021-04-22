import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthTokenService} from '../../me/auth-token.service';
import {ICharacter} from '../../../character/character.model';

@Injectable()
export class CharacterResource {

  constructor(
    private http: HttpClient,
    private authTokenService: AuthTokenService
  ) { }

  findAll(): Observable<ICharacter[]> {
    const token = this.authTokenService.getToken();
    return this.http.get<ICharacter[]>('http://localhost:3000/characters', {
      ...token && {
        headers: { Authorization: `Bearer ${token}` }
      }
    });
  }

  findOne(id: string): Observable<ICharacter> {
    return this.http.get<ICharacter>('http://localhost:3000/characters/' + id);
  }

  create(character: ICharacter): Observable<ICharacter> {
    return this.http.post<ICharacter>('http://localhost:3000/characters', character);
  }

  update(character: ICharacter): Observable<any> {
    return this.http.put<ICharacter>('http://localhost:3000/characters/' + character.id, character);
  }

  remove(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/characters/' + id);
  }
}
