import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from './auth.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ]
})
export class AuthModule { }
