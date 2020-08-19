"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes.js");
const auth = require("./auth.js");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const session = require("express-session");
const pug = require("pug");
const app = express();
const mongo = require("mongodb").MongoClient;

fccTesting(app); //For FCC testing purposes

app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", __dirname + "/views/pug");


mongo.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    var db = client.db("fcc_test_users");
    if (err) {
      console.log("Database error: " + err);
    } else {
      console.log("Successful database connection");

      auth(app, db);

      routes(app, db);

      app.listen(process.env.PORT || 3000, () => {
        console.log("Listening on port " + process.env.PORT);
      });
    }
  }
);




