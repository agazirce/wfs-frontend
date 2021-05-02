import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActorComponent} from './actor.component';
import {AdminGuard, MeGuard} from '../common/me/me.guard';
import { ActorDetailedComponent } from './actor-detailed/actor-detailed.component';
import { ActorEditComponent } from './actor-edit/actor-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ActorComponent
  },
  {
    canActivate: [MeGuard],
    path: 'edit',
    component: ActorEditComponent
  },
  {
    canActivate: [MeGuard],
    path: 'edit/:id',
    component: ActorEditComponent
  },
  {
    path: ':id',
    component: ActorDetailedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorRoutingModule { }
