import { Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {CharacterService} from '../character.service';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ICharacter} from '../character.model';
import {IActor} from '../../common/resource/actor/actor.model';
import {ActorService} from '../../actor/actor.service';

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
  isAdmin: boolean;
  selectedGenre: string;
  characterActors: IActor[] = [];
  actors: IActor[] = [];

  constructor(
    private characterService: CharacterService,
    private actorService: ActorService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      _id: [undefined],
      firstName: [undefined],
      lastName: [undefined],
      nickname: [undefined],
      birthYear: [undefined],
      nationality: [undefined],
      gender: [undefined],
      species: [undefined]
    }, { validators: this.atLeastOne('firstName', 'lastName', 'nickname') });
    this.reset();
    if (this.router.url === '/characters/edit') {
      this.actorService.getAllItems().subscribe(actors => {
        this.actors = actors;
      });
    }
    // update form with character informations
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
          this.actorService.getAllItems().subscribe(actors => {
            if (character.actors.length === 0){
              this.actors = actors;
            } else {
              // generate 2 arrays :
              // - 1 with actors we could add
              // - 1 with actors we could remove
              actors.forEach(actor => {
                character.actors.forEach(characterActor => {
                  if (actor._id === characterActor._id) {
                    this.characterActors.push(actor);
                  } else {
                    this.actors.push(actor);
                  }
                });
              });
            }
          });
          if (character.gender){
            this.selectedGenre = character.gender;
          }
        })
      );
    this.isAdmin = router.url.includes('admin');
  }

  save(): void {
    if (this.formGroup.valid) {
      const character: ICharacter = {
        _id: this.formGroup.value._id ? this.formGroup.value._id : undefined,
        firstName: this.formGroup.value.firstName ? this.formGroup.value.firstName : undefined,
        lastName: this.formGroup.value.lastName ? this.formGroup.value.lastName : undefined,
        nickname: this.formGroup.value.nickname ? this.formGroup.value.nickname : undefined,
        birthYear: this.formGroup.value.birthYear ? this.formGroup.value.birthYear : undefined,
        nationality: this.formGroup.value.nationality ? this.formGroup.value.nationality : undefined,
        gender: this.selectedGenre ? this.selectedGenre : undefined,
        species: this.formGroup.value.species ? this.formGroup.value.species : undefined,
        actors: this.characterActors
      };
      this.characterService.saveItem(character)
        .subscribe(createdCharacter => console.log(createdCharacter));
      if (this.router.url === '/characters/edit'){
        this.reset();
      } else if (this.isAdmin){
        this.router.navigate(['/characters/admin']);
      } else {
        this.router.navigate(['/characters']);
      }
    }
  }

  pushActor(actor: IActor): void {
    this.characterActors.push(actor);
    const index = this.actors.indexOf(actor);
    if (index > -1) {
      this.actors.splice(index, 1);
    }
  }

  popActor(actor: IActor): void {
    const index = this.characterActors.indexOf(actor);
    if (index > -1) {
      this.characterActors.splice(index, 1);
    }
    this.actors.push(actor);
  }

  reset(): void {
    this.formGroup.reset({
    });
    this.characterActors.forEach(actor => {
      this.actors.push(actor);
    });
    this.characterActors = [];
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
