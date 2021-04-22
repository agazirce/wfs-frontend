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

  constructor(
    private service: CharacterService,
    private route: ActivatedRoute,
    private router: Router) {
    this.initComponent();
    console.log('Constructor');
  }

  initComponent(): void {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.isDetail = true;
      this.service.getItem(id).subscribe(character => {
        this.item = character;
      });
    }
  }

  remove(): void {
    if (this.item?.id){
      this.service.removeItem(this.item.id).subscribe();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/characters']);
      });
    }
  }
}
