# vialet.app

La page d'accueil des apps Mac d'Aurélien Vialet : son nom, un paragraphe, et un bloc de couleur par app
qui mène à son site (`nom.vialet.app`). Une page statique, sans framework, sans cookie, sans traceur,
sur la couche partagée `vialet/` (CSS, polices, JavaScript) commune à tous les sites.

- `site/public/apps.json` : la liste des apps (nom, dossier `brand` dans le dépôt vialetapps, adresse, accroche, statut)
- `site/gabarit.html` : le gabarit ; `site/public/index.html` est généré, ne pas l'éditer à la main
- `site/public/hub.css` : le style propre à cette page, par-dessus `vialet/vialet.css`
- `docs/ajouter-une-app.md` : ajouter une app
- `docs/deploiement.md` : déploiement par `rsync`, bloc nginx de la racine et redirection d'`app.vialet.app`

Rendu et vérification, depuis le dépôt [vialetapps](https://github.com/avialet/vialetapps) voisin de celui-ci :

    scripts/sync-site.sh --hub

Aperçu local : `cd site/public && python3 -m http.server 8766`, puis http://localhost:8766.

Licence [MIT](LICENSE).
