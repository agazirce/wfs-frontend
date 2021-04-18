import { Component } from '@angular/core';
import {IMovie} from './movie.model';
import {MovieService} from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  providers: [
    MovieService
  ]
})
export class MovieComponent {

  items: IMovie[] | undefined;

  constructor(
    private service: MovieService) {
    this.initComponent();
  }

  initComponent(): void {
    this.service.getAllItems().subscribe(movies => {
      this.items = movies;
    });
  }
}
