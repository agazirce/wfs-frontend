import {Component} from '@angular/core';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  providers: [
    CharacterService
  ]
})
export class CharacterComponent{

  items$ = this.service.getAllItems();

  constructor(
    private service: CharacterService) { }
}
