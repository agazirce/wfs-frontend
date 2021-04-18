import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IMovie} from './movie.model';
import {MovieResource} from '../common/resource/movie/movie.resource';

@Injectable()
export class MovieService {

  constructor(
    private movieResource: MovieResource
  ) { }

  getAllItems(): Observable<IMovie[]> {
    return this.movieResource.findAll();
  }

  getItem(id: number): Observable<IMovie> {
    return this.movieResource.findOne(id);
  }

  saveItem(movie: IMovie): Observable<IMovie> {
    return this.movieResource.create(movie);
  }

  removeItem(id: number): Observable<any> {
    return this.movieResource.remove(id);
  }
}
