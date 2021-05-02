import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IActor } from 'src/app/common/resource/actor/actor.model';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-actor-item',
  templateUrl: './actor-item.component.html',
  styleUrls: ['./actor-item.component.scss']
})
export class ActorItemComponent {
  @Input() actor: IActor;

  constructor(private actorService: ActorService,
    private router: Router) { }

  remove(): void {
    if (this.actor._id){
      this.actorService.removeItem(this.actor._id).subscribe();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/actors']);
      });
    }
  }
}
