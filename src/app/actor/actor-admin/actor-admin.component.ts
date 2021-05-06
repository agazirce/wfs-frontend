import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-actor-admin',
  templateUrl: './actor-admin.component.html',
  styleUrls: ['./actor-admin.component.scss']
})
export class ActorAdminComponent implements OnInit {
  displayedColumns: string[] = ['lastName', 'firstName', 'nationality', 'birthDate', 'gender' , 'update', 'remove'];
  datasource: any;

  constructor(private actorService: ActorService,
    private router: Router) { }

  ngOnInit(): void {
    this.actorService.getAllItems().subscribe((actors) => {
      actors.forEach((actor) => { actor.birthDate = new Date(actor.birthDate)})
      this.datasource = actors;
    });
  }

  remove(id: string): void {
    if (id){
      this.actorService.removeItem(id).subscribe();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/actors/admin']);
      });
    }
  }
}
