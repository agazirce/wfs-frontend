import {Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy, SimpleChanges} from '@angular/core';
import { CharacterItemAttribute, ICharacter } from '../character.model';
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
export class CharacterItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item: ICharacter | undefined;
  @Output() attributeClick = new EventEmitter<CharacterItemAttribute>();
  isDetail = false;

  CharacterItemAttribute = CharacterItemAttribute;

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

  onAttributeClick(attribute: CharacterItemAttribute): void {
    this.attributeClick.emit(attribute);
  }

  remove(): void {
    if (this.item?.id){
      this.service.removeItem(this.item.id).subscribe();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/characters']);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes', changes);
  }

  ngOnDestroy(): void {
    console.log('Destroy');
  }

  ngOnInit(): void {
    console.log('Init');
  }
}
