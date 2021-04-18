import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ICharacterDto} from './character.dto';
import {AuthTokenService} from '../../me/auth-token.service';

@Injectable()
export class CharacterResource {

  constructor(
    private http: HttpClient,
    private authTokenService: AuthTokenService
  ) { }

  findAll(): Observable<ICharacterDto[]> {
    const token = this.authTokenService.getToken();
    return this.http.get<ICharacterDto[]>('http://localhost:3000/characters', {
      ...token && {
        headers: { Authorization: `Bearer ${token}` }
      }
    });
  }

  findOne(id: number): Observable<ICharacterDto> {
    return this.http.get<ICharacterDto>('http://localhost:3000/characters/' + id);
  }

  create(character: ICharacterDto): Observable<ICharacterDto> {
    return this.http.post<ICharacterDto>('http://localhost:3000/characters', character);
  }

  update(dto: ICharacterDto): Observable<any> {
    return this.http.put<ICharacterDto>('http://localhost:3000/characters/' + dto.id, dto);
  }

  remove(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/characters/' + id);
  }
}
