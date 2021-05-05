import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';

const routes: Routes = [
  {
    path: 'characters',
    loadChildren: () => import('./character/character.module')
      .then(module => module.CharacterModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./movie/movie.module')
      .then(module => module.MovieModule)
  },
  {
    path: 'actors',
    loadChildren: () => import('./actor/actor.module')
      .then(module => module.ActorModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module')
      .then(module => module.UserModule)
  },
  {
    path: 'login',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
