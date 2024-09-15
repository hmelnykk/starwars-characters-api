StarWars Characters API on NestJS

## Description
API allows you to GET information about all Star Wars Characters.
Use endpoint {/people} to get the first page of that big list of characters. Use pagination {/people/?page={number}} to open a page by its number.
Use endpoint {/people/{id}} to get a character by his ID.
API saves all opened data to database, and when you want to open a page or a character second time - API will open that data from database, not from internal API.

## Swagger
Use default swagger endpoint /api to open Swagger, where you can test API.

## Technologies
NestJS (+its libraries), Swagger, MySQL.
