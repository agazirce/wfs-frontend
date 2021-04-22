import { Component, Input } from '@angular/core';
import { CharacterItemAttribute, ICharacter } from '../character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  @Input() items: ICharacter[] | undefined | null;
}
