import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {UserResource} from '../common/resource/user/user.resource';
import {IUser} from './user.model';

@Injectable()
export class UserService {

  constructor(
    private userResource: UserResource
  ) { }

  getAllItems(): Observable<IUser[]> {
    return this.userResource.findAll()
      .pipe(
        map((users: IUser[]) => {
          return users;
        })
      );
  }

  getItem(id: string): Observable<IUser> {
    return this.userResource.findOne(id);
  }

  saveItem(user: IUser): Observable<IUser> {
    const save$ = user._id
      ? this.userResource.update(user)
      : this.userResource.create(user);
    return save$;
  }

  removeItem(id: string): Observable<any> {
    return this.userResource.remove(id);
  }
}
