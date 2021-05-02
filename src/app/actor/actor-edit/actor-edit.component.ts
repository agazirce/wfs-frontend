import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IActor } from 'src/app/common/resource/actor/actor.model';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.scss'],
})
export class ActorEditComponent {
  formGroup: FormGroup;
  id: string;
  update: Boolean;
  actor: IActor;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private actorService: ActorService
  ) {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.update = true;
      this.actorService.getItem(this.id).subscribe((actor) => {
        this.actor = actor;
        this.reset();
      });
    }

    this.formGroup = this.formBuilder.group({
      _id: [undefined],
      firstName: [undefined],
      lastName: [undefined],
      gender: [undefined],
      birthdate: [undefined],
      nationality: [undefined],
      nickname: [undefined],
    });
    this.reset();
  }

  reset(): void {
    if (this.id && this.actor) {
      // Si on est sur un update on remet les valeurs précédente d'un acteur
      this.formGroup.reset({
        _id: this.actor._id,
        title: this.actor.firstName,
        genre: this.actor.gender,
        pictures: this.actor.pictures,
        birthdate: this.actor.birthDate,
        nickname: this.actor.nickname,
      });
    } else {
      this.formGroup.reset();
    }
  }

  save(): void {
    if (this.formGroup.valid) {
      if (this.id && this.actor) {
        this.actor.firstName = this.formGroup.value.firstName;
        this.actor.lastName = this.formGroup.value.lastName;
        this.actor.gender = this.formGroup.value.gender;
        this.actor.birthDate = this.formGroup.value.birthDate;
        this.actor.nationality = this.formGroup.value.nationality;
        this.actor.nickname = this.formGroup.value.nickname;
        this.actor.pictures = this.formGroup.value.pictures;
        this.actorService
          .updateItem(this.id, this.actor)
          .subscribe((updatedactor) => console.log(updatedactor));
        this.reset();
      } else {
        const actor: IActor = {
          _id: '',
          firstName: this.formGroup.value.firstName,
          lastName: this.formGroup.value.lastName,
          gender: this.formGroup.value.gender,
          pictures: this.formGroup.value.pictures,
          birthDate: this.formGroup.value.birthDate,
          nationality: this.formGroup.value.nationality,
          nickname: this.formGroup.value.nickname,
        };
        this.actorService
          .saveItem(actor)
          .subscribe((createdActor) => console.log(createdActor));
        this.reset();
      }
    }
  }
}
