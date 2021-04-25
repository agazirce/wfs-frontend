import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss'],
  providers: [
    MovieService
  ]
})
export class MovieEditComponent {
  formGroup: FormGroup;
  update: boolean = false;
  movie: IMovie;
  id: string;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.update = true;
      this.movieService.getItem(this.id).subscribe(movie => {
        this.movie = movie;
        this.reset();
      });
    }
    this.formGroup = this.formBuilder.group({
      _id: [undefined],
      title: [undefined, [Validators.required, Validators.minLength(2)]],
      affiche: [undefined, [Validators.minLength(2)]],
      genre: [undefined, [Validators.minLength(2)]],
      realisator: [undefined, [Validators.minLength(2)]],
      year: [undefined, [Validators.required, Validators.max(9999)]],
      duration: [undefined, [Validators.required, Validators.max(9999)]],
      preview: [undefined, [Validators.minLength(2)]]
    });
    this.reset();
  }

  save(): void {
    if (this.formGroup.valid) {
      if (this.id && this.movie) {
        this.movie.title = this.formGroup.value.title;
        this.movie.genre = this.formGroup.value.genre;
        this.movie.affiche = this.formGroup.value.affiche;
        this.movie.year = this.formGroup.value.year;
        this.movie.realisator = this.formGroup.value.realisator;
        this.movie.duration = this.formGroup.value.duration;
        this.movie.preview = this.formGroup.value.preview;
        this.movieService.updateItem(this.id, this.movie).subscribe(updatedMovie => console.log(updatedMovie));
        this.reset();

      }
      else {
        const movie: IMovie = {
          _id: null,
          title: this.formGroup.value.title,
          genre: this.formGroup.value.genre,
          affiche: this.formGroup.value.affiche,
          year: this.formGroup.value.year,
          realisator: this.formGroup.value.realisator,
          duration: this.formGroup.value.duration,
          preview: this.formGroup.value.preview,
        };
        this.movieService.saveItem(movie)
          .subscribe(createdMovie => console.log(createdMovie));
        this.reset();
      }

    }
  }

  reset(): void {
    if (this.id && this.movie) {
      this.formGroup.reset({
        _id: this.movie._id,
        title: this.movie.title,
        genre: this.movie.genre,
        affiche: this.movie.affiche,
        year: this.movie.year,
        realisator: this.movie.realisator,
        duration: this.movie.duration,
        preview: this.movie.preview,
      })
    } else {
      this.formGroup.reset({
        year: 1970,
        duration: 120
      });
    }
  }

}
