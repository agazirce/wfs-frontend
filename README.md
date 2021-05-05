# Découpage du front en modules :

- 3 modules concernant les ressources consultables de façon publique : <br/>
      - movie,<br/>
      - character,<br/>
      - actor.<br/>
    Dans chacun de ces modules, on peut retrouver des components similaires :<br/>
        - list,<br/>
        - item,<br/>
        - edit,<br/>
        - admin.<br/>
  <br/>
- 1 module permettant la connexion :<br/>
      - auth.<br/>
  <br/>
- 1 module dédié à la gestion des utilisateurs :<br/>
      - user.<br/>
  <br/>
- Dans common, 2 modules :<br/>
      - me, pour contrôler l'authentification et le rôle de l'utilisateur le cas échéant,<br/>
      - resource, qui permet de faire le lien avec le serveur<br/>
        Ce dernier contient aussi 2 interceptors :<br/>
          - authentification afin de contrôler l'authentification sur chaque requête, <br/>
          - error.handler afin de renvoyer un message compréhensible à l'utilisateur en cas d'erreur.<br/>
  <br/>
- 1 module gérant l'affichage général :<br/>
      - layout.<br/>
  <br/>
- 4 modules gérant le routing interne avec gestion des différentes autorisations<br/>
      - movie-routing,<br/>
      - character-routing,<br/>
      - actor-routing,<br/>
      - user-routing.

Pour user, movie, character et actor, un service chacun qui permet une mutualisation des requêtes 
pour une même ressource afin de permettre une plus grande modularité future.
De plus, ces services permettent aussi d'utiliser un module donné dans un autre de façon légère.


# Qui a accès à quoi ?

- l'utilisateur non connecté peut consulter la liste et le détail des movies, characters et actors,
- l'utilisateur connecté en tant que membre peut en plus créer et mettre à jour dans ces 3 ressources,
- l'utilisateur connecté en tant qu'admin peut en plus supprimer dans ces trois ressources, ainsi qu'en avoir un aperçu global plus complet.
Il peut aussi gérer les utilisateurs (consulter, créer, modifier et supprimer).
