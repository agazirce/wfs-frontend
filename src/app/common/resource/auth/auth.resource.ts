import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAuthCredentialsDto, IAuthMeDto, IAuthTokenDto} from './auth.dto';

@Injectable()
export class AuthResource {

  private url = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: IAuthCredentialsDto): Observable<IAuthTokenDto> {
    return this.http.post<IAuthTokenDto>(`${this.url}/login`, credentials);
  }


  me(): Observable<IAuthMeDto> {
    return this.http.get<IAuthMeDto>(`${this.url}/me`);
  }
}
