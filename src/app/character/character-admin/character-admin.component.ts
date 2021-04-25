import {Component} from '@angular/core';
import {CharacterService} from '../character.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-character-admin',
  templateUrl: './character-admin.component.html',
  styleUrls: ['./character-admin.component.scss'],
  providers: [
    CharacterService
  ]
})

export class CharacterAdminComponent {

  constructor(
    private service: CharacterService,
    private router: Router
  ) { }

  datasource = this.service.getAllItems();
  displayedColumns: string[] = ['_id', 'firstName', 'lastName', 'nickname', 'birthYear', 'nationality', 'gender', 'species', 'update', 'remove'];

  remove(id: string): void {
    if (id){
      this.service.removeItem(id).subscribe();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/characters/admin']);
      });
    }
  }
}
