# Punto - Docker Compose

Ce fichier `docker-compose.yml` définit les services nécessaires pour déployer l'application Punto, composée d'une base
de données MongoDB, d'une interface d'administration MongoDB Express, d'une API et d'une application front-end.

## Services

1. **db**: Le service de base de données MongoDB.
2. **db-express**: L'interface d'administration MongoDB Express.
3. **api**: L'API de l'application.
4. **app**: L'application front-end.

## Déploiement

Pour déployer l'application, assurez-vous d'avoir Docker et Docker Compose installés sur votre système, puis exécutez la
commande suivante dans le répertoire contenant le fichier `docker-compose.yml` :

```shell
docker-compose up -d
```

## Ports

* La base de données MongoDB est accessible sur le port `27017`.
* L'interface d'administration MongoDB Express est accessible sur le port `8081`.
* L'API de l'application est accessible sur le port `3000`.
* L'application front-end est accessible sur le port `80`.

## Volumes

* **db_data**: Ce volume est utilisé pour stocker les données persistantes de la base de données MongoDB.

## Configuration

Vous pouvez modifier les valeurs des variables d'environnement pour personnaliser la configuration de chaque service.
Par exemple, vous pouvez changer les identifiants de l'administrateur MongoDB en modifiant les valeurs des variables
`MONGO_INITDB_ROOT_USERNAME` et `MONGO_INITDB_ROOT_PASSWORD` pour le service db, et les variables
`ME_CONFIG_MONGODB_ADMINUSERNAME` et `ME_CONFIG_MONGODB_ADMINPASSWORD` pour le service db-express.

## Structure des répertoires

* **./api**: Ce répertoire doit contenir le code source et le fichier Dockerfile pour construire l'image de l'API.
* **./app**: Ce répertoire doit contenir le code source et le fichier Dockerfile pour construire l'image de l'
  application front-end.
* **./mongo-init.js**: Ce fichier est utilisé pour initialiser la base de données MongoDB lors du premier lancement du
  conteneur. Il est monté en lecture seule dans le conteneur `db`.

## Arrêt et suppression des services

Pour arrêter et supprimer les services, exécutez la commande suivante dans le répertoire contenant le fichier
docker-compose.yml :

```shell
docker-compose down
```

## Remarque

Si vous souhaitez reconstruire les images des services `api` et `app`, n'oubliez pas d'utiliser l'option `--build` avec
la commande `docker-compose up`. Par exemple :

```shell
docker-compose up -d --build
```

Cela garantira que les modifications apportées au code source ou aux fichiers `Dockerfile` seront prises en compte lors
du redéploiement des services.

## Mise à jour des services

Pour mettre à jour les services lorsqu'il y a des modifications apportées au code source ou aux fichiers `Dockerfile`,
vous pouvez suivre ces étapes :

1. Arrêtez et supprimez les services en cours d'exécution avec la commande :

```shell
docker-compose down
```

2. Reconstruisez les images avec l'option --build :

```shell
docker-compose up -d --build
```

Cela permettra de s'assurer que les modifications apportées sont prises en compte et que les services sont mis à jour
avec les nouvelles images.

## Maintenance

Si vous rencontrez des problèmes avec les services, vous pouvez consulter les logs pour chaque conteneur en utilisant la
commande `docker logs`. Par exemple, pour consulter les logs du service `api`, exécutez :

```shell
docker logs api
```

Vous pouvez également consulter les logs en temps réel en utilisant l'option -f :

```shell
docker logs -f api
```

Cela vous aidera à identifier et à résoudre les problèmes liés au fonctionnement des services.