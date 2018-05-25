# START APP WITH DOCKER
docker-compose up -d --build

URL: [http://localhost:3000/](http://localhost:3000/)

# START APP WITHOUT DOCKER
npm install / yarn install
npm start / yarn start

## Features supplémentaires non réalisées

**Vous permettez de saisir les quantités de recettes et d’ingrédients en d’autres unités que le gramme : la recette, le kilogramme, la portion...**
Pour réaliser cela, il aurait fallu rajouter un champ supplémentaire permetttant de sélectionner l'unité, et à l'aide d'un système de conversion comme dans le premier exercice, réunir toutes les unités sur une unité commune

**Vous optimisez les performances en aplatissant votre modèle de données pour la lecture des informations de coûts et d’allergènes**
En stockant les éléments couts et allergènes séparément dans le store, pour ne pas avoir à réaliser des traitements dessus à chaque fois

**Vous implémentez un backend javascript pour persister vos données**
A l'aide de Node/Express, je fais un appel à une API Rest, qui se chargera de persister les données
