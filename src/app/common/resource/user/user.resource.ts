import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../../user/user.model';

@Injectable()
export class UserResource {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:3000/users');
  }

  findOne(id: string): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:3000/users/' + id);
  }

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/users', user);
  }

  update(user: IUser): Observable<any> {
    return this.http.put<IUser>('http://localhost:3000/users/' + user._id, user);
  }

  remove(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/users/' + id);
  }
}
