import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MeService} from './me.service';
import {AuthTokenService} from './auth-token.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MeService,
    AuthTokenService
  ]
})
export class MeModule { }
