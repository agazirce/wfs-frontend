import { Component, Input } from '@angular/core';
import { IMovie } from '../movie.model';
import {MovieService} from '../movie.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  providers: [
    MovieService
  ]
})
export class MovieItemComponent {
  @Input() item: IMovie | undefined;
  isDetail = false;

  constructor(
    private service: MovieService,
    private route: ActivatedRoute,
    private router: Router) {
    this.initComponent();
  }

  initComponent(): void {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.isDetail = true;
      this.service.getItem(id).subscribe(movie => {
        this.item = movie;
      });
    }
  }

  remove(): void {
    if (this.item?._id){
      this.service.removeItem(this.item._id).subscribe();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/movies']);
      });
    }
  }
}
