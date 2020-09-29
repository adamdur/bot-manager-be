import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

require('dotenv').config();

app.set('port',  process.env.APP_PORT || 3000);
app.set('host',  process.env.APP_HOST || 'localhost');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

export default app;
