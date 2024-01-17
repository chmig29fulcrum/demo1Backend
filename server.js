const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
//require('dotenv').config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

//dotenv.config({ path: './config.env' });
//require('dotenv').config({ path: './config.env' });
//require('dotenv').config()
//console.log('Current working directory:', process.cwd());

/*
// Get the current working directory
const currentWorkingDirectory = process.cwd();

console.log('Current working directory:', currentWorkingDirectory);

// Read the contents of the current working directory
fs.readdir(currentWorkingDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Print the list of files and directories
  console.log('Contents of the current working directory:');
  if (files.length === 0) {
    console.log('No files or directories found.');
  } else {
    files.forEach((file) => {
      console.log(file);
    });
  }
});
*/

dotenv.config({ path: 'config.env' });

const nodeEnv = process.env.NODE_ENV.trim();
const portVar = `PORT_${nodeEnv.toUpperCase()}`;
const dbVar = `DATABASE_${nodeEnv.toUpperCase()}`;

//console.log('All environment variables:', process.env);
//console.log(process.env.portVar);
//console.log(process.env[portVar]);
//console.log(process.env.PORT_PRODUCTION);

//console.log(portVar);
//console.log(process.env[portVar]);
const port = process.env[portVar] || 4001;

const app = require('./app');

const DB = process.env[dbVar];

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const server = app.listen(port, () => {
 // console.log(`portVar = ${portVar}`);
 // console.log(`dbVar = ${dbVar}`);
 // console.log(`process.env[portVar] = ${process.env[portVar]}`);

  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
