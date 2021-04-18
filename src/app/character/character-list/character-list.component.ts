import { Component, Input } from '@angular/core';
import { CharacterItemAttribute, ICharacter } from '../character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  @Input() items: ICharacter[] | undefined | null;
  count: Record<CharacterItemAttribute, number> = {
    [CharacterItemAttribute.id]: 0,
    [CharacterItemAttribute.firstName]: 0,
    [CharacterItemAttribute.lastName]: 0,
    [CharacterItemAttribute.birthYear]: 0
  };

  CharacterItemAttribute = CharacterItemAttribute;

  itemAttributeClick(attribute: CharacterItemAttribute): void {
    this.count[attribute]++;
  }
}
