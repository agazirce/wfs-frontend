import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICharacter } from 'src/app/character/character.model';
import { CharacterService } from 'src/app/character/character.service';
import { IMovie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss'],
  providers: [
    MovieService,
    CharacterService
  ]
})
export class MovieEditComponent {
  formGroup: FormGroup;
  update: boolean = false;
  movie: IMovie;
  id: string;
  characters: ICharacter[];
  charactersAdd: ICharacter[] = [];
  charactersDel: ICharacter[] = [];

  constructor(
    private movieService: MovieService,
    private characterService: CharacterService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.update = true;
      this.movieService.getItem(this.id).subscribe(movie => {
        this.movie = movie;
        this.reset();
      });
      this.characterService.getAllItems().subscribe(characters => {
        this.characters = characters;
      })
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
        //On remet à zéro les tableau de sauvegardes
        this.charactersAdd = [];
        this.charactersDel = [];
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
          characters: [],
        };
        this.movieService.saveItem(movie)
          .subscribe(createdMovie => console.log(createdMovie));
        this.reset();
      }

    }
  }

  pushCharacter(character: ICharacter) {
    this.movie.characters.push(character);
    this.charactersAdd.push(character);
  }

  popCharacter(character: ICharacter) {
    var index = this.movie.characters.indexOf(character);
    if (index > -1) {
      this.movie.characters.splice(index, 1);
    }
    this.charactersDel.push(character);
  }

  reset(): void {
    if (this.id && this.movie) {
      // Si on est sur un update on remet les valeurs précédente de movie
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
      //On remet tout les characters enlevé
      this.charactersDel.forEach(character => {
        this.movie.characters.push(character);
      })
      //On retire tout les characters ajouté
      this.charactersAdd.forEach(character => {
        var index = this.movie.characters.indexOf(character);
        if (index > -1) {
          this.movie.characters.splice(index, 1);
        }
      });
      //On remet à zéro les tableau de sauvegardes
      this.charactersAdd = [];
      this.charactersDel = [];
    } else {
      this.formGroup.reset({
        year: 1970,
        duration: 120
      });
    }
  }

}
