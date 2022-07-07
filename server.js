// const api = require('./routes/api');
const html = require('./routes/html');

const express = require('express');
const app = express();

// this will allow our server to run remotely on Heroku as well as locally on port 3001
const PORT = process.env.PORT || 3001;


// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// method for serving assets located in the public folder
app.use(express.static('public'));

// parse incoming JSON data
app.use(express.json());
// app.use('/api', api);
app.use('/', html);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});