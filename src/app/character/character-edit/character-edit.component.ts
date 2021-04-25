import { Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {CharacterService} from '../character.service';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Gender, ICharacter} from '../character.model';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.scss'],
  providers: [
    CharacterService
  ]
})
export class CharacterEditComponent {

  formGroup: FormGroup;
  character$: Observable<ICharacter>;
  genders = Gender;
  keys = Object.keys;
  isAdmin: boolean;

  constructor(
    private characterService: CharacterService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      _id: [],
      firstName: [''],
      lastName: [''],
      nickname: [''],
      birthYear: [undefined],
      nationality: [undefined],
      gender: [undefined],
      species: [undefined]
    }, { validators: this.atLeastOne('firstName', 'lastName', 'nickname') });
    this.reset();
    this.character$ = this.route.params
      .pipe(
        map(params => params.id),
        filter(id => !!id),
        switchMap(id => this.characterService.getItem(id)),
        tap(character => {
          this.formGroup.patchValue({
            _id: character._id,
            firstName: character.firstName,
            lastName: character.lastName,
            nickname: character.nickname,
            birthYear: character.birthYear,
            nationality: character.nationality,
            gender: character.gender,
            species: character.species
          });
        })
      );
    this.isAdmin = router.url.includes('admin');
  }

  save(): void {
    if (this.formGroup.valid) {
      const character: ICharacter = {
        _id: this.formGroup.value._id,
        firstName: this.formGroup.value.firstName,
        lastName: this.formGroup.value.lastName,
        nickname: this.formGroup.value.nickname,
        birthYear: this.formGroup.value.birthYear,
        nationality: this.formGroup.value.nationality,
        gender: this.formGroup.value.gender,
        species: this.formGroup.value.species
      };
      this.characterService.saveItem(character)
        .subscribe(createdCharacter => console.log(createdCharacter));
      this.reset();
    }
  }

  reset(): void {
    this.formGroup.reset({
    });
  }

  atLeastOne(firstControl: string, secondControl: string, thirdControl: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const firstName = control.get(firstControl)?.value;
      const lastName = control.get(secondControl)?.value;
      const nickname = control.get(thirdControl)?.value;

      if ((firstName === null || firstName === '')
        && (lastName === null || lastName === '')
        && (nickname === null || nickname === '')) {
        return {none: true};
      }

      return null;
    };
  }

}
