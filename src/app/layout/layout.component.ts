import { Component } from '@angular/core';
import {MeService} from '../common/me/me.service';
import {IAuthMeDto} from '../common/resource/auth/auth.dto';
import {IMenuItem} from './layout.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  title = 'front';
  me$: Observable<IAuthMeDto | null> = this.meService.getMe();

  constructor(
    private meService: MeService
  ) {
  }

  menuItems: IMenuItem[] = [
    {
      label: 'Personnages',
      link: 'characters'
    },
    {
      label: 'Acteurs',
      link: 'actors'
    },
    {
      label: 'Films',
      link: 'movies'
    },
    {
      label: 'Gestion des personnages',
      link: 'characters/admin'
    },
    {
      label: 'Gestion des films',
      link: 'movies/admin'
    },
    {
      label: 'Gestion des acteurs',
      link: 'actors/admin'
    },
    {
      label: 'Gestion des utilisateurs',
      link: 'users'
    },
    {
      label: 'Connexion',
      link: 'login'
    }
  ];

  logout(): void {
    this.meService.logout();
  }
}
