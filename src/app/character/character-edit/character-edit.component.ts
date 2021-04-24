import { Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharacterService} from '../character.service';
import {ActivatedRoute} from '@angular/router';
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

  constructor(
    private characterService: CharacterService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.formGroup = this.formBuilder.group({
      id: [],
      firstName: [undefined],
      lastName: [undefined],
      nickname: [undefined],
      birthYear: [undefined],
      nationality: [undefined],
      gender: [undefined],
      species: [undefined]
    });
    this.reset();
    this.character$ = this.route.params
      .pipe(
        map(params => params.id),
        filter(id => !!id),
        switchMap(id => this.characterService.getItem(id)),
        tap(character => {
          this.formGroup.patchValue({
            id: character.id,
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
  }

  save(): void {
    if (this.formGroup.valid) {
      const character: ICharacter = {
        id: this.formGroup.value.id,
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

}
