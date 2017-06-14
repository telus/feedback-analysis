// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const firebase = require('firebase-admin');
const indico = require('indico.io')

// Get API routes from api file in routes folder
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist so compiled files moved to dist folder on app build
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file; invalid urls redirected to homepage
app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

var settings = {"api_key": "70fa9c87529dc0cd4e5dc150938f744e"};
var response = function(res) { console.log(res); }
var logError = function(err) { console.log(err); }

indico.sentiment(['indico is so easy to use!', 'Still really easy, yiss'], settings)
  .then(response)
  .catch(logError);