import { Component } from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    UserService
  ]
})
export class UserComponent {

  items$ = this.service.getAllItems();

  constructor(
    private service: UserService,
    private router: Router) { }

  datasource = this.service.getAllItems();
  displayedColumns: string[] = ['_id', 'firstName', 'lastName', 'username', 'birthDate', 'email', 'gender', 'role', 'update', 'remove'];

  remove(id: string): void {
    if (id){
      this.service.removeItem(id).subscribe();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
