# Ajouter une app au catalogue

1. Copier l'icône (PNG 256 px) dans `site/public/img/`.
2. Ajouter une entrée dans `site/public/apps.json` :

   ```json
   {
     "name": "Nom",
     "url": "https://nom.vialet.app",
     "tagline": "Une phrase qui dit ce que fait l'app.",
     "icon": "/img/nom.png",
     "platform": "macOS 26",
     "status": "available",
     "color": "#2F6FEB"
   }
   ```

   `status` vaut `available` (carte cliquable) ou `soon` (carte grisée, sans lien).
   `url` doit être en `https://*.vialet.app` : le script ignore toute autre adresse.
3. Mettre à jour la version sans JavaScript dans `site/public/index.html` si l'app est la première de la liste.
4. Commit et push sur `main` : le site est déployé automatiquement.

La page de l'app elle-même (`nom.vialet.app`) est un dépôt à part, sur le modèle de
[pico-site](https://github.com/avialet/pico-site).
