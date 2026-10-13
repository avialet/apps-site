# app.vialet.app

Le catalogue des apps natives pour Mac, sous forme d'index typographique sobre (volontairement distinct de l'identité de chaque app, qui apporte sa propre couleur). Chaque app a sa propre page sur `nom.vialet.app` ;
cette page les liste. Une page statique, sans framework, sans cookie, sans traceur.

- `site/public/apps.json` : la liste des apps (nom, adresse, accroche, icône, statut)
- `site/public/` : le site (HTML, CSS, JavaScript)
- `docs/ajouter-une-app.md` : ajouter une app au catalogue
- `docs/deploiement.md` : déploiement par `rsync` et configuration du serveur

Aperçu local : `cd site/public && python3 -m http.server 8766`, puis http://localhost:8766.

Licence [MIT](LICENSE).
