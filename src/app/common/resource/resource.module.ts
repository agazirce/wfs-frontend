import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CharacterResource } from './character/character.resource';
import {MovieResource} from './movie/movie.resource';
import {AuthentificationInterceptor} from './authentification.interceptor';
import {ErrorHandlerInterceptor} from './error.handler.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MeModule} from '../me/me.module';
import {AuthResource} from './auth/auth.resource';
import { ActorResource } from './actor/actor.resource';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    MeModule
  ],
  providers: [
    CharacterResource,
    MovieResource,
    ActorResource,
    AuthResource,
    { provide: HTTP_INTERCEPTORS, useClass: AuthentificationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
  ]
})
export class ResourceModule { }
