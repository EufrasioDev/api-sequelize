require("reflect-metadata");
require("express-async-errors");
const express = require("express");
const helmet = require("helmet");
const { errors } = require("celebrate");
const routes = require("./app/routes");
const { message } = require("./app/Middlewares/message");

const app = express();

app.use(helmet.hidePoweredBy({setTo: 'PHP/5.5.14'}));
app.use(express.json());
app.use(helmet.xssFilter());
app.use(routes);
app.use(errors());
app.use(message);

module.exports = app;
