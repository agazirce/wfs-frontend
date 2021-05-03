import { Component } from '@angular/core';
import {UserService} from '../user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {IUser} from '../user.model';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {ICharacter} from '../../character/character.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [
    UserService
  ]
})
export class UserEditComponent {

  formGroup: FormGroup;
  user$: Observable<IUser>;
  selectedGenre: string;
  selectedRole: string;

  constructor(
    private service: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      _id: [undefined],
      firstName: [undefined],
      lastName: [undefined],
      username: [undefined],
      birthDate: [undefined],
      email: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]],
      gender: [undefined],
      role: [undefined]
    });
    this.reset();
    // update form with user informations
    this.user$ = this.route.params
      .pipe(
        map(params => params.id),
        filter(id => !!id),
        switchMap(id => this.service.getItem(id)),
        tap(user => {
          this.formGroup.patchValue({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            birthDate: user.birthDate,
            email: user.email,
            gender: user.gender,
            role: user.role
          });
          if (user.gender){
            this.selectedGenre = user.gender;
          }
          if (user.role){
            this.selectedRole = user.role;
          }
        })
      );
  }

  save(): void {
    if (this.formGroup.valid) {
      const user: IUser = {
        _id: this.formGroup.value._id ? this.formGroup.value._id : undefined,
        firstName: this.formGroup.value.firstName ? this.formGroup.value.firstName : undefined,
        lastName: this.formGroup.value.lastName ? this.formGroup.value.lastName : undefined,
        username: this.formGroup.value.username ? this.formGroup.value.username : undefined,
        birthDate: this.formGroup.value.birthDate ? this.formGroup.value.birthDate : undefined,
        email: this.formGroup.value.email ? this.formGroup.value.email : undefined,
        password: this.formGroup.value.password ? this.formGroup.value.password : undefined,
        gender: this.selectedGenre ? this.selectedGenre : undefined,
        role: this.selectedRole ? this.selectedRole : undefined
      };
      this.service.saveItem(user)
        .subscribe(createdUser => console.log(createdUser));
      if (this.router.url === '/users/edit'){
        this.reset();
      } else {
        this.router.navigate(['/users']);
      }
    }
  }

  reset(): void {
    this.formGroup.reset({
    });
  }
}
