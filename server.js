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

var batchInput = [
    "This app is so shit",
    "I can't pay my bill",
    "I can't login since new update",
    "Keeps crashing everytime I try to pay bills",
    "Great app! Best out of most telecoms",
    "keeps showing an error on offers page"
];

const appSectionsDict = [
    "bill", "billing", "login", "usage", "data",
    "top-up", "android", "site", "mobile", "offers",
    "iphone", "travelpass", "travel", "plan", "plans",
    "device", "overage", "surcharge", "overcharged",
];

const negativeKeywordsDict = [
    "expensive", "crash", "crashes", "crashed", "crashing",
    "pricey", "fuck", "shit", "error", "bugs",
    "bug", "outages", "outage", "slow", "glitchy"
]

var sentimentResponse = function(res) {

    for (var i = 0; i < res.length; i++) {

        console.log(res[i]);

        if (res[i] > 0.7) {
            console.log("positive")
            // write to json with positive sentiment tag
        }
        else if (res[i] > 0.4 && res[i] < 0.7) {
            console.log("neutral")
            // write to json with neutral sentiment tag
        }
        else {
            console.log("negative")
            // write to json with negative sentiment tag
        }
    }
}

var keywordsResponse = function (res) {
    for (var i = 0; i < res.length; i++) {
        let keys = Object.keys(res[i]);
        for (var j = 0 ; j < keys.length; j++) {
            let key = keys[j];
            if (negativeKeywordsDict.indexOf(key.toString()) > -1) {
                console.log("keyword found: " + key);
                // write to json with negative keyword tag
            }
        }
    }
}

var logError = function(err) {
    console.log(err);
}

// indico.sentiment(batchInput, settings)
//     .then(sentimentResponse)
//     .catch(logError);

// indico.emotion(batchInput, settings)
//     .then(emotionResponse)
//     .catch(logError);

indico.keywords(batchInput, settings)
    .then(keywordsResponse)
    .catch(logError);

