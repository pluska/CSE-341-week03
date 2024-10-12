const express = require('express');
const app = express();

const mongodb = require('./data/database');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

// Handling Errors

process.on('uncaughtException', (err, origin) => {
    console.error(`Uncaught Exception: ${err}\nException origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database initialized!');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
});