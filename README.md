# BanqueFront

Front Angular du TP « Banque Hexa en ligne » — guichet des conseillers, branché sur l'API Banking.

## Prérequis

- Node.js et npm
- .NET SDK (pour l'API)
- Docker (pour la base PostgreSQL)

## Lancer l'application

L'ordre compte : **l'API d'abord, le front ensuite**.

### 1. Lancer l'API

Depuis le dossier de la correction du backend :

```bash
docker compose up -d
dotnet run --project Banking.Api --launch-profile https
```

L'API écoute sur `https://localhost:7180`, sa documentation sur
`https://localhost:7180/swagger`.

### 2. Lancer le front

Depuis ce dossier :

```bash
npm install
ng serve
```

Ouvrir ensuite `http://localhost:4200/`. L'application se recharge
automatiquement à chaque modification des fichiers source.

## Comment le front joint l'API

Le front n'appelle jamais `https://localhost:7180` directement : toutes ses
requêtes sont relatives (`/api/...`). Le serveur de développement les relaie
grâce au proxy déclaré dans `proxy.conf.json` :

```json
{
  "/api": {
    "target": "https://localhost:7180",
    "secure": false,
    "changeOrigin": true
  }
}
```

Ce fichier est branché sur la cible `serve` de `angular.json` :

```json
"options": { "proxyConfig": "proxy.conf.json" }
```

Le proxy est nécessaire, pas cosmétique : il place le front et l'API sur une
même origine, ce qui évite le CORS et laisse passer le cookie de session.

Pour vérifier que tout passe bien par le proxy : `F12` → **Network** → filtrer
`api`. Les requêtes doivent viser `localhost:4200/api/...` et jamais
`localhost:7180`. Si l'API est arrêtée, l'écran affiche un message d'erreur au
lieu d'une page blanche.

## Structure du projet

```
src/app/
├── core/                  # aucune dépendance vers les features
│   ├── models.ts          # interfaces du contrat de l'API
│   ├── bank-api.ts        # seul fichier qui connaît les URL de l'API
│   ├── account-utils.ts   # fonctions pures : nom, IBAN, tri, total
│   └── problem.ts         # messages d'erreur ProblemDetails
├── feature/counter/       # l'écran du guichet
│   ├── counter.ts         # état et calculs
│   ├── counter.html       # structure affichée
│   └── counter.css        # mise en forme
└── app.config.ts          # provideHttpClient(), router
```

## Tests

Le projet utilise Vitest, via le testeur intégré à la CLI Angular :

```bash
ng test
```

## Build

```bash
ng build
```

Les artefacts sont produits dans `dist/`. La configuration `production` est
utilisée par défaut (optimisation, budgets, hash des noms de fichiers).

## Ressources

- [Angular](https://angular.dev) — documentation officielle
- [httpResource](https://angular.dev/guide/http/http-resource) — lecture de données HTTP
- [Contrat de l'API Banking](../contrat-api.pdf) — routes, modèles et erreurs
