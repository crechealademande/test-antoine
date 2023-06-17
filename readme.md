# Epreuve technique - CALD

Ce projet permet de gérer les crèches et les demandes des familles pour l'accueil des enfants. Il ingère les informations des crèches à partir d'un fichier CSV et évalue la possibilité d'accueil pour chaque enfant en fonction de leur âge, de leur code postal et du département. Les résultats sont affichés dans la console.

## Configuration requise

- Node.js version 12 ou supérieure
- Fichiers CSV des crèches et des familles conformes aux formats requis

## Installation

1. Clonez le repository ou téléchargez les fichiers du projet.

2. Dans le répertoire du projet, exécutez la commande suivante pour installer les dépendances :

```
npm install
```

## Utilisation - Méthode 1

1. Assurez-vous d'avoir les fichiers CSV des crèches et des familles prêts à être utilisés.

2. Exécutez la commande suivante pour lancer le programme :

```
node index.js <crecheCsvFile> <famillesCsvFile>
```

Remplacez `<crecheCsvFile>` par le chemin vers le fichier CSV des crèches et `<famillesCsvFile>` par le chemin vers le fichier CSV des familles.

3. Les résultats de l'évaluation seront affichés dans la console pour chaque enfant, indiquant s'il peut être pris en charge, la crèche qui l'accueille déjà (si possible) et les crèches possibles pour son accueil.

## Utilisation - Méthode 2

1. Assurez-vous d'avoir les fichiers CSV des crèches et des familles dans le dossier `assets`.

1. Exécutez la commande suivante pour lancer le programme :

```
npm run start
```

3. Les résultats de l'évaluation seront affichés dans la console pour chaque enfant, indiquant s'il peut être pris en charge, la crèche qui l'accueille déjà (si possible) et les crèches possibles pour son accueil.

## Formats des fichiers CSV

### Fichier CSV des crèches (creche.csv)

Le fichier CSV des crèches doit suivre le format suivant :

```
Nom, Capacité, Adresse, Code postal, Ville
Crèche alur,25,45 rue de la Marie,59 130,Lambersart
```

- Chaque ligne représente une crèche.
- Les valeurs doivent être séparées par des virgules.
- Les en-têtes de colonnes sont facultatifs.

### Fichier CSV des familles (familles.csv)

Le fichier CSV des familles doit suivre le format suivant :

```
Nom, Prénom, Date de naissance, Adresse, Code postal, Ville, Creche actuelle
Smidt,Alexandre,2/5/2018,5 avenue des Lillas,59160,Lomme,"l'enfant nuage, 10 avenue des peupliers, 59160",
```

- Chaque ligne représente une famille avec un enfant.
- Les valeurs doivent être séparées par des virgules.
- Les en-têtes de colonnes sont facultatifs.

## Notes supplémentaires

- Les enfants de plus de 4 ans ou de moins de 4 mois ne peuvent pas être pris en charge.
- Les crèches possibles pour un enfant sont celles du même département.
- Les meilleures crèches possibles sont celles ayant le même code postal que la famille.

Pour plus d'informations, veuillez consulter la documentation des classes et des méthodes du code source.

## Auteur

Projet développé par Antoine Pochet
