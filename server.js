const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');

const passport = require('passport');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//set process env params
//import db conf
const connect = require('./config/db.connect')
connect(mongoose);

const passportConf = require('./config/passport.conf');
passportConf(passport);

let PORT = 3000;

let server = http.createServer(app);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const router = require('express').Router();

const routes = require('./app/routes');
routes(app, router, passport)

server.listen(PORT, () => console.log(`Student server listening on port ${PORT}!`))
