const express = require('express')
const cors = require('cors')
const app = express();
const fs1 = require('node:fs')
const mysql = require('mysql2')
const fs = require("fs");

app.use(cors());
app.use(express.json());

port = 3080;

app.listen(port, () => {
  console.log("Server listening on to port::" + port);
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'isma',
  port: 3308,
  password: 'IsmaElPro2002',
  database: 'uni_ismael_naciri_fernandez'
})

connection.connect((err) => {
  if (err) throw err;
  console.log("Conected to MySql")

  // llistarProf();
  virgenSanta()
})

function llistarProf() {
  connection.query(`SELECT DEPT_CODI FROM departament WHERE DEPT_NOM = 'INFORMATICA I MATEMATICA APLICADA'`, (error, results) => {
    if (error) throw error;

    if (results.length === 0) {
      console.log("No departament found")
      return;
    }

    const id_departament = results[0].DEPT_CODI;

    connection.query(`SELECT PROF_DNI, PROF_NOM, PROF_COGNOM_1, PROF_COGNOM_2, PROF_TELEFON FROM professor` +
      ` WHERE PROF_CATEGORIA = 'Associat' AND PROF_DEPT_CODI = ?`, [id_departament], (error, result) => {
      if (error) throw error;

      console.log(result);
    })
  });
}

function virgenSanta() {
  // connection.query(`ALTER TABLE alumnes ADD ALUMN_VIRGEN INTEGER DEFAULT 0`, (err, result) => {
  //   if (err) throw err;
  // });

  connection.query(`UPDATE alumnes SET ALUMN_VIRGEN = 0`, (error, resultat) => {
    if (error) {
      console.log("Maria, maria...");
      throw error;
    }
    console.log(resultat);
  })
}
