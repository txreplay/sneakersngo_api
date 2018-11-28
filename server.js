require('dotenv').config();

const express    = require('express');
const bodyParser = require('body-parser');
const db         = require('./services/db.service');

const {mainRouter} = require('./routes/main.router');

const port = process.env.PORT;
const app  = express();

const init = () => {
    db.initClient();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/', mainRouter);

    app.listen(port, () => { console.log(`Server is now live on port ${port}`); });
};

init();