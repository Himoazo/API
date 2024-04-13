# REST API
Denna webbtjänst (REST API) hanterar lagring av arbetserfarenheter, den fungerar som ett cv-register. 
Applikationen är byggd på NodeJs och Express server som sköter kommunikationen med en MYSQL databas där datan lagras. NPM packet mysql2 har använts för att hantera kommunikationen mellan applikationen och databasen. 

Applikationen i detta repo med en mysql databas lanseras på ett PaaS som heter railway.app vid denna [länk](https://api-production-b4dc.up.railway.app/)

## Denna webbtjänst hanterar CRUD operations 
-	** Create** genom POST request som skickar JSON data till databasen där den lagras.
-	** Read ** genom en GET request som hämtar lagrade data i database.
-	** Update ** genom PUT request som skickar JSON data som uppdaterar/ändrar en befintlig rad vid angivit id i databasen
-	** Delete ** Genom DELETE request som raderar en rad vid angivit id i databasen.
