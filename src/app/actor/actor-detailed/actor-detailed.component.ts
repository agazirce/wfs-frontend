import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActor } from 'src/app/common/resource/actor/actor.model';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-actor-detailed',
  templateUrl: './actor-detailed.component.html',
  styleUrls: ['./actor-detailed.component.scss']
})

export class ActorDetailedComponent implements OnInit {
  @Input() actor: IActor;
  actorId: string;

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.actorId = this.route.snapshot.params.id;
    if (this.actorId !== undefined) {
      this.actorService.getItem(this.actorId).subscribe((actorSpe) => this.actor = actorSpe);
    }
  }

}
