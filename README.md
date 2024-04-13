# REST API
Denna webbtjänst (REST API) hanterar lagring av arbetserfarenheter, den fungerar som ett cv-register. 
Applikationen är byggd på NodeJs och Express server som sköter kommunikationen med en MYSQL databas där datan lagras. NPM packet mysql2 har använts för att hantera kommunikationen mellan applikationen och databasen. 

Applikationen i detta repo med en mysql databas lanseras på ett PaaS som heter railway.app vid denna [länk](https://api-production-b4dc.up.railway.app/)

## Denna webbtjänst hanterar CRUD operations 
1. **Create** genom **POST request** that sends JSON data to the database for storage.
2. **Read** genom **GET request** that retrieves stored data from the database.
3. **Update** genom **PUT request** that sends JSON data to modify an existing row at a specified ID in the database.
4. **Delete** genom **DELETE request** that removes a row at a specified ID from the database.

