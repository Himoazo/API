const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
const mysql = require('mysql2');
cors = require('cors');
app.use(cors());
app.use(express.json());


//Pool Variable för att kommunisera med databasen
const pool = mysql.createPool({
    host: process.env.CV_HOST,
    user: process.env.CV_USER,
    password: process.env.CV_PASSWORD,
    database: process.env.CV_DATABASE,
    port: process.env.MYSQLPORT,
  });


// Hantera GET requests
app.get("/api", (req, res) => {
  //Läst allt från tabellen workexperience
  pool.query("SELECT * FROM workexperience", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error executing query" + err});
    } else if(results === 0){
      res.status(404).json({ error: "Not found" });
    } else {
      console.log(results);
      res.json({ message: "API works fine", db: results });
    }
  });
});

//Hantera POST requests
app.post("/api", (req, res)=>{
  //Läser in incommande data från formuläret
  let companyname = req.body.companyname;
  let jobtitle = req.body.jobtitle;
  let location = req.body.location;
  let startdate = req.body.startdate;
  let enddate = req.body.enddate;
  if (enddate === "") {
    enddate = null; 
  }
  let errors = {
    message: "",
    details: ""
  }

  if(companyname && jobtitle && location && startdate){
    //Lagra en rad data i tabellen
      pool.execute(`
      INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate)
      VALUES (?, ?, ?, ?, ?)`,
      [companyname, jobtitle, location, startdate, enddate], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Error executing query" + err});
        } else if(results === 0){
          res.status(404).json({ error: "Not found" });
        }else {
          res.json({ message: "Insertion ok"});
        }});
  }else{
    //fel meddelande
    errors.message = "Alla obligatoriska fällt måste fyllas i";
    errors.details = "Alla fällt, förutom slutdatum, måste fyllas i";
    res.status(400).json(errors);
    return;
  }
});

//Hantera PUT requests
app.put('/api/workexp/:id', (req, res) => {
  let id = req.params.id;
  let companyname = req.body.companyname;
  let jobtitle = req.body.jobtitle;
  let location = req.body.location;
  let startdate = req.body.startdate;
  let enddate = req.body.enddate;
  if (enddate === "Pågående") {
    enddate = null; 
  }
  
  let errors = {
    message: "",
    details: ""
  }

  if(companyname && jobtitle && location && startdate){
    //Uppdatera en befintlig rad i tabellen
      pool.execute(`
      UPDATE workexperience SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ? WHERE id= ?
      `,
      [companyname, jobtitle, location, startdate, enddate, id], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Error at editing data" + err});
        } else if(results === 0){
          res.status(404).json({ error: "Not found" });
        }else {
          res.json({ message: "Editing ok"});
        }});
  }else{
    //fel meddelande
    errors.message = "Alla obligatoriska fällt måste fyllas i";
    errors.details = "Alla fällt, förutom slutdatum, måste fyllas i";
    res.status(400).json(errors);
    return;
  }
});

//Hantera DELETE requests
app.delete('/api/workexp/:id', (req, res) => {
  let id = req.params.id;
  //Radera en rad från tabellen
  pool.query("DELETE FROM workexperience WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error with deleting data att id: " + id + err});
    } else if(results === 0){
      res.status(404).json({ error: "Not found" });
    } else {
      console.log(results);
      res.json({ message: "Successfully deleted at id: " + id, db: results });
    }
  });
});




  //Startar server
  app.listen(port, ()=>{
    console.log("Kopplat till server på port:" + port);
  });