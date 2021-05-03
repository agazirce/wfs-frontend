import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IActor } from '../common/resource/actor/actor.model';

@Component({
  selector: 'app-dialog-actor-movie',
  templateUrl: './dialog-actor-movie.component.html',
  styleUrls: ['./dialog-actor-movie.component.scss']
})
export class DialogActorMovieComponent implements OnInit {
  acteur: IActor
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
