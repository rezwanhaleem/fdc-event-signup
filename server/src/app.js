//server.js
const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const redis = require('redis');
const keys = require('./keys')
const favicon = require('express-favicon');
const path = require('path');
const bodyParser = require('body-parser');//Parse JSON requests
const cookieParser = require('cookie-parser');

const app = express();

//----------------------Redis-------------------------------------
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();
//----------------------Redis End---------------------------------

//---------------------Postgres-----------------------------------
const {Pool} = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});
//----------------------Postgres End------------------------------

//------------------------GOOGLE----------------------------------
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const spreadsheetId = process.env.GOOGLE_OPEN_SPREADSHEET_ID;

const creds = {
  "type": "service_account",
  "project_id": "fdc-event-signup",
  "private_key_id": process.env.GOOGLE_PRIVATE_KEY_ID,
  "private_key": process.env.GOOGLE_PRIVATE_KEY,
  "client_email": process.env.GOOGLE_CLIENT_EMAIL,
  "client_id": process.env.GOOGLE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.GOOGLE_CLIENT_CERT
};
//------------------------GOOGLE END-------------------------------

app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/ping', function (req, res) {
  return res.send('pong');
}); 

app.get('/', function (req, res) {
  return res.send('online');
}); 

module.exports = app;