import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {MeService} from './me.service';
import {map, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserRole} from '../resource/auth/auth.dto';

@Injectable({ providedIn: 'root'})
export class MeGuard implements CanActivate{

  constructor(
    private  meService: MeService,
    private snackBar: MatSnackBar
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.meService.getMe()
      .pipe(
        map(authMeDto => !!authMeDto),
        tap(isLogged => {
          if (!isLogged) {
            this.snackBar.open(
              `Cette fonctionnalité nécessite d'être authentifié`,
              'OK',
              { duration: 5000});
          }
        }));
  }

}

@Injectable({ providedIn: 'root'})
export class AdminGuard implements CanActivate{

  constructor(
    private  meService: MeService,
    private snackBar: MatSnackBar
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.meService.getMe()
      .pipe(
        map(authMeDto => authMeDto?.role === UserRole.admin),
        tap(isAdmin => {
          // @ts-ignore
          if (!isAdmin) {
            this.snackBar.open(
              `Cette fonctionnalité nécessite d'être administrateur`,
              'OK',
              { duration: 5000});
          }
        })
      );
  }
}
