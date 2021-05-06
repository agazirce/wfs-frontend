import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActorComponent} from './actor.component';
import {AdminGuard, MeGuard} from '../common/me/me.guard';
import { ActorDetailedComponent } from './actor-detailed/actor-detailed.component';
import { ActorEditComponent } from './actor-edit/actor-edit.component';
import { ActorAdminComponent } from './actor-admin/actor-admin.component';

const routes: Routes = [
  {
    path: '',
    component: ActorComponent
  },
  {
    canActivate: [AdminGuard],
    path: 'create',
    component: ActorEditComponent
  },
  {
    canActivate: [AdminGuard],
    path: 'edit/:id',
    component: ActorEditComponent
  },
  {
    canActivate: [AdminGuard],
    path: 'admin',
    component: ActorAdminComponent
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
