import { Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharacterService} from '../character.service';
import {ActivatedRoute} from '@angular/router';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ICharacter} from '../character.model';

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

  constructor(
    private characterService: CharacterService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.formGroup = this.formBuilder.group({
      id: [],
      firstName: [undefined, [Validators.minLength(2)]],
      lastName: [undefined],
      nickname: [undefined],
      birthYear: [undefined],
      gender: [undefined, [Validators.minLength(4)]],
      species: [undefined, [Validators.minLength(2)]]
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
            gender: character.gender,
            species: character.species,
            actor: character.actor
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
        gender: this.formGroup.value.gender,
        species: this.formGroup.value.species,
        actor: this.formGroup.value.actor
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
