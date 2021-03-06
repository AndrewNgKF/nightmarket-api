import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import config from './config';
import routes from './routes';
const LocalStrategy = require('passport-local').Strategy;

let app = express();
app.server = http.createServer(app);

//Limit the size of data which a user can send
app.use(bodyParser.json({
  limit: config.bodyLimit
}));

app.use(passport.initialize());

let Account = require('./model/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/v1', routes);

app.server.listen(config.port);
console.log(`started on port ${app.server.address().port} `);

export default app;
