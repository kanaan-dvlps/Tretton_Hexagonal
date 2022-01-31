const express = require('express');
const bodyParser = require('body-parser');
const ODM = require('mongoose');
const app = express();
const process = require('process');
const os = require('os');

// ! ##### Constants #####
// ? -----------------------


// ! ##### Middlewares #####
// ? -----------------------
// * dotenv middleware
require('dotenv').config();

// * BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ? Routes files
const GetCoworkers = require('./Routes/GetCoworkers');
const GetCoworker = require('./Routes/GetCoworker');
const EditCoworker = require('./Routes/EditCoworker');
const Login = require('./Routes/Login');

// ? Router middleware
app.use('/api/v3', GetCoworkers);
app.use('/api/v3', GetCoworker);
app.use('/api/v3', EditCoworker);
app.use('/api/v3', Login);

// ! ##### Server #####
// ? -----------------------

const SERVER = app.listen(process.env.PORT, () => {
  ODM.connect(process.env.MONGODB_URI);

  // ? Colorized terminal message
  console.log(`-----------------------------------`);
  console.log(`\n\x1b[1m\x1b[33m PORT:\x1b[0m\x1b[1m \x1b[32m${process.env.PORT} \x1b[0m`);

  console.log(`\x1b[1m\x1b[33m ADDRESS:\x1b[0m\x1b[1m \x1b[32m${process.env.BASE_URL} \x1b[0m`);
  console.log(`\x1b[1m\x1b[33m IP:\x1b[0m\x1b[1m \x1b[32m${ os.networkInterfaces().eth0[0].address } \x1b[0m`);
  console.log(`\x1b[1m\x1b[33m HOSTNAME:\x1b[0m\x1b[1m \x1b[32m${ os.hostname() } \x1b[0m \n`);
  // console.log(`\x1b[1m\x1b[33m## ENVIRONMENT:\x1b[0m\x1b[1m \x1b[32m${process.env.ENVIRONMENT} ## \x1b[0m \n`);
  ODM.connection.on('error', error => {
    console.log(`\x1b[41m\x1b[1mODM error\x1b[0m`, error);
  });

  console.log(`\x1b[34m\x1b[1mconnection to ODM...\x1b[0m`);
  ODM.connection.on('connected', () => {
    console.log(`\x1b[34m\x1b[1msuccessfully connected to ODM!\x1b[0m`);
  });
  console.log(`\x1b[34m\x1b[1mprocess PID ${process.pid} started\x1b[0m`);
});

function signalHandler(signal) {
  if (signal) {
    console.log(`received signal: ${signal}`);
    console.log(`closing HTTP server`);
    SERVER.close(() => {
      console.log(`HTTP server closed gracefully`);
      ODM.connection.close(false, () => {
        console.log(`Database connection closed gracefully`);
        console.log(`process PID ${process.pid} stopped`);
        process.exit(0);
      });
    });
  }
};

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
