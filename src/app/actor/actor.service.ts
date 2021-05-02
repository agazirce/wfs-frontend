import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActor } from '../common/resource/actor/actor.model';
import { ActorResource } from '../common/resource/actor/actor.resource';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private actorResource: ActorResource) { }

  getAllItems(): Observable<IActor[]> {
    return this.actorResource.findAll();
  }

  getItem(id: string): Observable<IActor> {
    return this.actorResource.findOne(id);
  }

  saveItem(actor: IActor): Observable<IActor> {
    return this.actorResource.create(actor);
  }

  updateItem(id: string , actor: IActor): Observable<IActor> {
    return this.actorResource.update(id , actor);
  }

  removeItem(id: string): Observable<any> {
    return this.actorResource.remove(id);
  }
}
