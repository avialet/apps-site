# Déploiement de app.vialet.app

Site statique (`site/public`), synchronisé sur le serveur par `rsync` via SSH à chaque
push sur `main` (`.github/workflows/deploy.yml`).

## Réglages du dépôt GitHub

| Nom | Type | Valeur |
|---|---|---|
| `DEPLOY_ENABLED` | variable | `true` |
| `DEPLOY_PATH` | variable | `.` (la clé est enfermée dans le dossier du site) |
| `DEPLOY_HOST`, `DEPLOY_USER` | secrets | serveur et utilisateur de déploiement |
| `DEPLOY_SSH_KEY` | secret | clé privée dédiée à ce site |
| `DEPLOY_KNOWN_HOSTS` | secret | `ssh-keyscan -t ed25519 <hôte>` |

## Côté serveur

- DNS : enregistrements `A` et `AAAA` pour `app.vialet.app`.
- Dossier `/var/www/hub/site/public`, propriété de l'utilisateur de déploiement.
- Bloc nginx dédié `app.vialet.app` (certificat wildcard `*.vialet.app` déjà présent).
- Clé publique dans `authorized_keys` de l'utilisateur, avec
  `restrict,command="/usr/bin/rrsync /var/www/hub/site/public"` : la clé ne donne aucun shell
  et ne peut écrire que dans ce dossier.

Le même schéma s'applique à chaque nouveau projet `nom.vialet.app` : un dépôt, un dossier,
un utilisateur et une clé par site.
