import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICharacter } from 'src/app/character/character.model';
import { CharacterService } from 'src/app/character/character.service';
import { IMovie } from '../movie.model';
import { MovieService } from '../movie.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogActorMovieComponent } from 'src/app/dialog-actor-movie/dialog-actor-movie.component';
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
  update = false;
  movie: IMovie;
  id: string;
  characters: ICharacter[];
  charactersAdd: ICharacter[] = [];
  charactersDel: ICharacter[] = [];

  constructor(
    public dialog: MatDialog,
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
    }
    this.characterService.getAllItems().subscribe(characters => {
      this.characters = characters;
    });
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
        // On remet ?? z??ro les tableau de sauvegardes
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
          characters: this.charactersAdd ,
        };
        this.movieService.saveItem(movie)
          .subscribe(createdMovie => console.log(createdMovie));
        this.reset();
      }

    }
  }

  pushCharacter(character: ICharacter): void {
    const dialogRef = this.dialog.open(DialogActorMovieComponent,{
      data: {
        actors: character.actors
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      character.actors = [];
      //On vide la liste d'acteurs du character puis on y ajoute l'acteurs s??lectionner pour ce film
      character.actors.push(result);
      console.log(`Dialog result: `,character.actors);
      if (this.id){
        this.movie.characters.push(character);
      }
      this.charactersAdd.push(character);
    });
  }

  popCharacter(character: ICharacter): void {
    if (this.id){
      const index = this.movie.characters.indexOf(character);
      if (index > -1) {
        this.movie.characters.splice(index, 1);
      }
      this.charactersDel.push(character);
    }
    else{
      const index = this.charactersAdd.indexOf(character);
      if (index > -1) {
        this.charactersAdd.splice(index, 1);
      }
    }
  }

  reset(): void {
    if (this.id && this.movie) {
      // Si on est sur un update on remet les valeurs pr??c??dente de movie
      this.formGroup.reset({
        _id: this.movie._id,
        title: this.movie.title,
        genre: this.movie.genre,
        affiche: this.movie.affiche,
        year: this.movie.year,
        realisator: this.movie.realisator,
        duration: this.movie.duration,
        preview: this.movie.preview,
      });
      // On remet tout les characters enlev??
      this.charactersDel.forEach(character => {
        this.movie.characters.push(character);
      });
      // On retire tout les characters ajout??
      this.charactersAdd.forEach(character => {
        const index = this.movie.characters.indexOf(character);
        if (index > -1) {
          this.movie.characters.splice(index, 1);
        }
      });
      // On remet ?? z??ro les tableau de sauvegardes
      this.charactersAdd = [];
      this.charactersDel = [];
    } else {
      this.charactersAdd = [];
      this.formGroup.reset({
        year: 1970,
        duration: 120
      });
    }
  }

}
