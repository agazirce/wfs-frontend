import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { IActor } from './actor.model';

@Injectable()
export class ActorResource {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<IActor[]> {
    return this.http.get<IActor[]>('http://localhost:3000/actors');
  }

  findOne(id: string): Observable<IActor> {
    return this.http.get<IActor>('http://localhost:3000/actors/' + id);
  }

  create(actor: IActor): Observable<IActor> {
    return this.http.post<IActor>('http://localhost:3000/actors', actor);
  }

  remove(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/actors/' + id);
  }

  update(id: string, actor: IActor): Observable<IActor> {
    return this.http.put<IActor>('http://localhost:3000/actors/'+ id, actor);
  }
}