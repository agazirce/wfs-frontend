import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-admin',
  templateUrl: './movie-admin.component.html',
  styleUrls: ['./movie-admin.component.scss'],
  providers:[
    MovieService
  ]
})
export class MovieAdminComponent {

  constructor(
    private service: MovieService,
    private router: Router

  ) { }

  datasource = this.service.getAllItems()
  displayedColumns: string[] = ['id', 'title', 'genre', 'realisator', 'duration' , 'update', 'remove'];

  remove(id: string): void {
    if (id){
      this.service.removeItem(id).subscribe();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/movies/admin']);
      });
    }
  }
}
