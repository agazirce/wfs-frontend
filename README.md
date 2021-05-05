Découpage du front en modules :

- 3 modules concernant les ressources consultables de façon publique :
      - movie,
      - character,
      - actor.
    Dans chacun de ces modules, on peut retrouver des components similaires :
        - list,
        - item,
        - edit,
        - admin.

- 1 module permettant la connexion :
      - auth.

- 1 module dédié à la gestion des utilisateurs :
      - user.

- Dans common, 2 modules :
      - me, pour contrôler l'authentification et le rôle de l'utilisateur le cas échéant,
      - resource, qui permet de faire le lien avec le serveur
        Ce dernier contient aussi 2 interceptors :
          - authentification afin de contrôler l'authentification sur chaque requête, 
          - error.handler afin de renvoyer un message compréhensible à l'utilisateur en cas d'erreur.

- 1 module gérant l'affichage général :
      - layout.
