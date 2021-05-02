import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorComponent } from './actor.component';
import { ActorDetailedComponent } from './actor-detailed/actor-detailed.component';
import { ActorItemComponent } from './actor-item/actor-item.component';
import { MatCardModule } from '@angular/material/card';
import { ActorListComponent } from './actor-list/actor-list.component';
import { ActorRoutingModule } from './actor-routing.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { ActorEditComponent } from './actor-edit/actor-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActorComponent,
    ActorDetailedComponent,
    ActorItemComponent,
    ActorListComponent,
    ActorEditComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ActorRoutingModule,
    RouterModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    ActorComponent
  ]
})
export class ActorModule { }
