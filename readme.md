# Twitter Bot
This bot was created to interact with people on the platform, during an eSports tournament for learning purposes.

## Functionalities
* Reply people when mentioned.
* Uses Riot API to extract data from the players of the tournament to reply those mentions.
* Scrap some pages for extra data.
* Makes requests to a Mongo database in wich the players and their account identifiers are stored.

## Dependencies
* [Puppeteer](https://github.com/puppeteer/puppeteer): Version ^13.7.0 
* [Axios](https://github.com/axios/axios) Version ^0.26.1
* [Mongoose](https://mongoosejs.com/): Version ^6.3.3
* [twitter-api-client](https://www.npmjs.com/package/twitter-api-client): Version ^1.5.2
* [dotenv](https://www.npmjs.com/package/dotenv): Version ^16.0.0

## Enviroment Variables
In order for this app to work, it is necessary to provide some environment variables vía dotenv library.
It is necessary to provide a Mongo URI that points to our database, as well as the URL pointing to the Riot Server on which we want to make the application.

#### Riot Api
To make requests to Riot Api is needed an account with which will be provided with a Developer Key. This key expires every 24h, so in order to have a durable key, is needed to present a detailed description of our project and wait for the concession. This project has his own Product Key.

#### Twitter Api
Also, to make request to Twitter Api we must create a developer account and ask for keys. Those keys are ConsumerKey, ConsumerSecret, AccessToken and AccessTokenSecret.

## Run
Create .env file with all Enviroment Variables.

Install dependencies:
```
npm i
```

Run locally:
```
npm start
```
## Deployment

This app has been hosted in [Railway](https://railway.app/)

## ToDo
- [X] La función para sacar información del jugador debe usar puuid en lugar del nombre de invocador. Este último nunca debe usarse para buscar en la api ya que puede cambiar.
- [X] Añadir un número de horas en las que buscar (Pasar eso a unix: unix hoy - unix numero horas.)
- [X] Tweet para cuando falla el nombre.
- [X] Conseguir la diferencia de LPs aunque sea con scraping.
- [X] Hacer la lista completa de participantes.
- [X] Funciona perfecto el tweet manual, sea cual sea el @.
- [X] Detector de menciones y respuesta.
- [X] Controlar todas las exceptions.
- [X] Crear frases según el winrate y numero de partidas. 
- [X] Si está en 100 puntos añadir un esquema de la promo 🟥🟩🟩🟥⬜.
- [X] En accounts, todos los nombres deberían estar escritos en minuscula. Cuando se busque se hará en minuscula y se twiteara asi tambien.
- [X] Matchear el array de partidas con los LPs para ver si concuerdan. Solo enseñar LPs si concuerdan.
- [X]  A la hora de twittear random, solo twittear de gente que haya jugado hace poco. Su ultima partida transcurrió hace más de una hora pero menos de cuatro.
- [X] Si no salen los LP, no se ve lo de las ultimas 12 horas y confunde.
- [X] La request a la API de riot para las partidas ahora contará con query parameters para el tiempo y el tipo de cola, así se ahorrarán llamadas a la API.
- [X] Se debe ver el número de partidas desde la primera llamada a la API (La que solo nos da códigos), ahí es cuando se debe parar el programa si hay menos de 3.
- [] Docker
- [X] Deploy
- [X] Cambiar el bucle que comprueba si hay menciones nuevas por un stream. 
- [X] Usar since_id y max_id en la request de menciones.
- [X] Pasar datos de acuentas a una base de datos en mongo y que se actualize de forma automática haciendo scrapping a páginas como por ejemplo lolpros
