import { Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IMovie} from '../movie.model';
import {MovieService} from '../movie.service';

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

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder
  ) {
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

  reset(): void {
    this.formGroup.reset({
      year: 1970,
      duration: 120
    });
  }

}
