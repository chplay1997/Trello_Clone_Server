const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
//Cho phep client doc tai nguyen tu xa
const cors = require('cors');

const api = require('./api/index');
const db = require('./config/db');

const app = express();
const port = 9000;

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//http logger
// app.use(morgan('combined'));

app.use(cors());
//connect to db
db.connect();

api(app);
app.listen(port, () => {
    console.log(`App listening on port localhost:${port}`);
});
