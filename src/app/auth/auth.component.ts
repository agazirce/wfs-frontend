import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {IAuthLoginCredentials} from './auth.model';
import {Router} from '@angular/router';
import {AuthTokenService} from '../common/me/auth-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [
    AuthService
  ]
})
export class AuthComponent {
  formGroup: FormGroup;

  constructor(
    private service: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authTokenService: AuthTokenService
  ) {
    if (this.authTokenService.getToken()){
      this.authTokenService.clearToken();
      console.log(this.authTokenService.getToken());
    }
    this.formGroup = this.formBuilder.group({
      email: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]]
    });
  }

  login(): void {
    if (this.formGroup.valid) {
      const credentials: IAuthLoginCredentials = this.formGroup.value;
      this.service.login(credentials).subscribe();
    }
  }
}
