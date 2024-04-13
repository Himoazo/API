# REST API
Denna webbtjänst (REST API) hanterar lagring av arbetserfarenheter, den fungerar som ett cv-register. 
Applikationen är byggd på NodeJs och Express server som sköter kommunikationen med en MYSQL databas där datan lagras. NPM packet mysql2 har använts för att hantera kommunikationen mellan applikationen och databasen. 

Applikationen i detta repo med en mysql databas lanseras på ett PaaS som heter railway.app vid denna [länk](https://api-production-b4dc.up.railway.app/)

## Denna webbtjänst hanterar CRUD operations 
1. **Create** genom att ta emot och bearbeta **POST request** med json data från klienten och lagra datan i databasen.
2. **Read** genom att ta emot och bearbeta **GET request** som hämtar lagrade data i database.
3. **Update** genom att ta emot och bearbeta **PUT request** som skickar JSON data som uppdaterar/ändrar en befintlig rad vid angivit id i databasen
4. **Delete** genom att ta emot och bearbeta **DELETE request** från klienten som raderar en rad vid angivit id i databasen.

