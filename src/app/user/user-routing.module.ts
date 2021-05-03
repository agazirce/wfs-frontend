import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {AdminGuard, MeGuard} from '../common/me/me.guard';

const routes: Routes = [
  {
    canActivate: [MeGuard, AdminGuard],
    path: '',
    component: UserComponent
  },
  {
    canActivate: [MeGuard, AdminGuard],
    path: 'edit',
    component: UserEditComponent
  },
  {
    canActivate: [MeGuard, AdminGuard],
    path: 'edit/:id',
    component: UserEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
