import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMovie} from '../../../movie/movie.model';

@Injectable()
export class MovieResource {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>('http://localhost:3000/movies');
  }

  findOne(id: string): Observable<IMovie> {
    return this.http.get<IMovie>('http://localhost:3000/movies/' + id);
  }

  create(movie: IMovie): Observable<IMovie> {
    return this.http.post<IMovie>('http://localhost:3000/movies', movie);
  }

  update(id: string, movie: IMovie): Observable<IMovie> {
    return this.http.put<IMovie>('http://localhost:3000/movies/'+ id, movie);
  }

  remove(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/movies/' + id);
  }
}
