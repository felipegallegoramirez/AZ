require("dotenv").config();

const express = require('express');
const cors = require('cors');
const router = require("../routes")
const dbConnectMongoDB = require("../config/mongo");
const { logErrors, errorHandler, boomErrorHandler } = require('../midleware/boomerrors');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = process.env.URL_ACEPTED || ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.set('trust proxy', true);
app.use(cors(options));

app.use(router)
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' +  port);
});

dbConnectMongoDB();
