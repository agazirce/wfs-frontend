import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IAuthLoginCredentials} from './auth.model';
import {AuthResource} from '../common/resource/auth/auth.resource';
import {tap} from 'rxjs/operators';
import {MeService} from '../common/me/me.service';
import {IAuthCredentialsDto} from '../common/resource/auth/auth.dto';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    private authResource: AuthResource,
    private meService: MeService,
    private router: Router
  ) { }

  login(credentials: IAuthLoginCredentials): Observable<any> {
    const dto = this.modelToDto(credentials);
    return this.authResource.login(dto)
      .pipe(
        tap(tokenDto => this.meService.login(tokenDto)),
        tap(() => this.router.navigate(['/characters']))
      );
  }

  private modelToDto(model: IAuthLoginCredentials): IAuthCredentialsDto {
    return {
      email: model.email,
      password: model.password
    };
  }
}
