# Ajouter une app

Les couleurs, les teintes et le pictogramme d'une app vivent dans son `Brand.swift`
(`vialetapps/<Nom>/<Nom>/App/Brand.swift`) : la page les relit au rendu, rien n'est recopié ici.

1. Ajouter une entrée dans `site/public/apps.json` :

   ```json
   { "name": "Nom", "brand": "Nom", "url": "https://nom.vialet.app", "tagline": "Une phrase qui dit ce que fait l'app.", "status": "available" }
   ```

   `brand` est le nom du dossier de l'app dans le dépôt vialetapps (CamelCase ASCII).
   `status` vaut `available` (bloc cliquable) ou `soon` (bloc atténué, sans lien).
2. Depuis le dépôt vialetapps : `scripts/sync-site.sh --hub`. Le gabarit est rendu dans
   `site/public/index.html` et vérifié.
   Le logo de la page (`.plaque-hub`, un secteur par app) et la description suivent `apps.json` au rendu.
3. Depuis vialetapps, régénérer les icônes et l'image de partage, qui lisent aussi `apps.json` :

   ```bash
   swift scripts/plaque.swift hub-svg --plein > ../apps-site/site/public/favicon.svg
   swift scripts/plaque.swift hub 64 ../apps-site/site/public/favicon.png --plein
   swift scripts/plaque.swift hub 180 ../apps-site/site/public/apple-touch-icon.png --plein
   swift scripts/plaque.swift hub-og ../apps-site/site/public/og.png
   ```
4. Commit et push sur `main` : le site est déployé automatiquement.

La page de l'app elle-même (`nom.vialet.app`) est un dépôt à part, créé par `scripts/new-site.sh <Nom>`
dans vialetapps (voir `template-site/docs/contenu.md`).
