import {Component, Input} from '@angular/core';
import { ICharacter } from '../character.model';
import {CharacterService} from '../character.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.scss'],
  providers: [
    CharacterService
  ]
})
export class CharacterItemComponent {
  @Input() item: ICharacter | undefined;
  isDetail = false;
  emptyArray: boolean;

  constructor(
    private service: CharacterService,
    private route: ActivatedRoute,
    private router: Router) {
    this.initComponent();
  }

  initComponent(): void {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.isDetail = true;
      this.service.getItem(id).subscribe(character => {
        this.item = character;
        if (character.actors.length === 0){
          this.emptyArray = true;
        }
      });
    }
  }

  remove(): void {
    if (this.item?._id){
      this.service.removeItem(this.item._id).subscribe();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/characters']);
      });
    }
  }
}
