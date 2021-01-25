require('./models/db');

const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const express = require('express');

const routing = require('./controller/routing');

let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', exphbs({extname: "hbs", defaultLayout: "mainLayout", layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

app.listen(8000, () => {
    console.log("Listening on port 8000");
});

app.use('/product', routing);