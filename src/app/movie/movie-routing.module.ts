import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieComponent} from './movie.component';
import {MovieEditComponent} from './movie-edit/movie-edit.component';
import {MovieItemComponent} from './movie-item/movie-item.component';
import {AdminGuard, MeGuard} from '../common/me/me.guard';
import {MovieAdminComponent} from './movie-admin/movie-admin.component';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent
  },
  {
    canActivate: [MeGuard, AdminGuard],
    path: 'admin',
    component: MovieAdminComponent
  },
  {
    canActivate: [MeGuard],
    path: 'edit',
    component: MovieEditComponent
  },
  {
    canActivate: [MeGuard],
    path: 'edit/:id',
    component: MovieEditComponent
  },
  {
    path: ':id',
    component: MovieItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
