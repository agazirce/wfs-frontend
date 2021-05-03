import { Component, OnInit } from '@angular/core';
import { IActor } from '../common/resource/actor/actor.model';
import { ActorService } from './actor.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss'],

})

export class ActorComponent implements OnInit {
  actorListItems: IActor[] | null;

  constructor(private actorService: ActorService) {}

  ngOnInit(): void {
    this.actorService.getAllItems().subscribe((actors) => this.actorListItems = actors);
  }
}
