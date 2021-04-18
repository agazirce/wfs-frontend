import {Injectable} from '@angular/core';
import {AuthTokenService} from './auth-token.service';
import {AuthResource} from '../resource/auth/auth.resource';
import {IAuthMeDto, IAuthTokenDto} from '../resource/auth/auth.dto';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class MeService {

  private me: IAuthMeDto | undefined;
  private me$ = new BehaviorSubject<IAuthMeDto | null>(null);

  constructor(
    private authTokenService: AuthTokenService,
    private authResource: AuthResource
  ) {
    if (this.authTokenService.getToken()) {
      this.setMe();
    }
  }

  login(tokenDto: IAuthTokenDto): void {
    this.authTokenService.setToken(tokenDto.token);
    this.setMe();
  }

  private setMe(): void {
    this.authResource.me()
      .subscribe(meDto => {
        this.me$.next(meDto);
      });
  }

  /* autre possibilité d'écriture :
  private setMe(): void {
    this.authResource.me().subscribe(this.me$);
  }
   */

  getMe(): Observable<IAuthMeDto | null> {
    return  this.me$.asObservable();
  }

  logout(): void {
    this.authTokenService.clearToken();
    this.me$.next(null);
  }
}
