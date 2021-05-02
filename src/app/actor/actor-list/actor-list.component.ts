import { Component, Input, OnInit } from '@angular/core';
import { IActor } from 'src/app/common/resource/actor/actor.model';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.scss']
})
export class ActorListComponent {
  @Input() actors: IActor[] | null;

  constructor() { }
}
