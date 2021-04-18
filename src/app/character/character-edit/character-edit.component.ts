import { Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharacterService} from '../character.service';
import {ICharacterDto} from '../../common/resource/character/character.dto';
import {ActivatedRoute, Params} from '@angular/router';
import {filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ICharacter} from '../character.model';
import * as moment from 'moment';

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
      firstName: [undefined, [Validators.required, Validators.minLength(2)]],
      lastName: [undefined, [Validators.required, Validators.minLength(2)]],
      age: [undefined, [Validators.required, Validators.min(0)]]
    });
    this.reset();
    this.character$ = this.route.params
      .pipe(
        map(params => parseInt(params.id, 10)),
        filter(id => !!id),
        switchMap(id => this.characterService.getItem(id)),
        tap(character => {
          this.formGroup.patchValue({
            id: character.id,
            firstName: character.firstName,
            lastName: character.lastName,
            age: moment().year() - character.birthYear
          });
        })
      );
  }

  save(): void {
    if (this.formGroup.valid) {
      const character: ICharacterDto = {
        id: this.formGroup.value.id,
        firstName: this.formGroup.value.firstName,
        lastName: this.formGroup.value.lastName,
        age: this.formGroup.value.age
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
