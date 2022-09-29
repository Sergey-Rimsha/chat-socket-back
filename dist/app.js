"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.listen(7001, () => {
    console.log('The application is listening on port 7001!');
});
