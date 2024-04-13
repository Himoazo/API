const mysql = require('mysql2');
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.CV_HOST,
    user: process.env.CV_USER,
    password: process.env.CV_PASSWORD,
    database: process.env.CV_DATABASE,
  });

  pool.query(`
  CREATE TABLE IF NOT EXISTS workexperience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    companyname VARCHAR(30) NOT NULL,
    jobtitle VARCHAR(30) NOT NULL,
    location VARCHAR(30) NOT NULL,
    startdate DATE NOT NULL,
    enddate DATE
  );`,
     (err, results)=> {
      if(err){
        console.error(err);
      }else{
        console.log(results);
      }
    }
  );




