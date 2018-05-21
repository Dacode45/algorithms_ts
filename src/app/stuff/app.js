import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import http from 'http';

const app = module.exports = express();
app.use(bodyParser.json())

app.post('')

app.listen(3000, () => console.log('lisining'));