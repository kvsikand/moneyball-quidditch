'use strict';

var express = require('express');
var baseRouter = express.Router(); // eslint-disable-line new-cap
var routes = ['player'];


function setupRoutes(postgres) {
  baseRouter.get('/', function index(req, res) {
    res.send('home page');
  });

  var router;
  routes.forEach(function(route) {
    router = require(`./${route}.router`)(postgres);
    baseRouter.use(`/${route}`, router);
  });
  return baseRouter;
}

module.exports = {
	setupRoutes: setupRoutes
};
