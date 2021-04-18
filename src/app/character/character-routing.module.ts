import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CharacterComponent} from './character.component';
import {CharacterEditComponent} from './character-edit/character-edit.component';
import {CharacterItemComponent} from './character-item/character-item.component';
import {AdminGuard, MeGuard} from '../common/me/me.guard';
import {CharacterAdminComponent} from './character-admin/character-admin.component';

const routes: Routes = [
  {
    path: '',
    component: CharacterComponent
  },
  {
    canActivate: [MeGuard, AdminGuard],
    path: 'admin',
    component: CharacterAdminComponent
  },
  {
    canActivate: [MeGuard],
    path: 'edit',
    component: CharacterEditComponent
  },
  {
    canActivate: [MeGuard],
    path: 'edit/:id',
    component: CharacterEditComponent
  },
  {
    path: ':id',
    component: CharacterItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule { }
