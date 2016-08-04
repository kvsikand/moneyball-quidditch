'use strict';

var express = require('express');
var promise = require('bluebird');
var baseRouter = express.Router(); // eslint-disable-line new-cap
var routes = ['player', 'game', 'action'];


function setupRoutes(postgres) {
  baseRouter.get('/', function index(req, res) {
    res.send('home page');
  });

  var router;
  routes.forEach(function(route) {
    router = require(`./${route}.router`)(postgres);
    baseRouter.use(`/${route}`, router);
  });

  baseRouter.get('/initialize', function(req, res) {
    postgres.sync({ force: true }).then(function() {
      res.send('initialized');
    });
  });

  baseRouter.get('/populateTest', function(req, res) {
    //populate some test data
    postgres.sync({ force: true }).then(function() {
      promise.all([
        postgres.player.create({
          first_name: 'first',
          last_name: 'player'
        }),
        postgres.player.create({
          first_name: 'second',
          last_name: 'player'
        }),
        postgres.player.create({
          first_name: 'third',
          last_name: 'player'
        }),
        postgres.game.create({
          name: 'old scrimmage',
          finished: Date.now()
        }),
        postgres.game.create({
          name: 'current scrimmage'
        }),
        postgres.stats_beater.create({
          playerId: 1,
          gameId: 1,
          pointsAgainst: 30,
          pointsFor: 10,
          controlGained: 2,
          controlLost: 1
        }),
        postgres.stats_chaser.create({
          playerId: 2,
          gameId: 1,
          pointsAgainst: 30,
          pointsFor: 10,
          pointsScored: 19,
          turnovers: 1
        }),
        postgres.stats_beater.create({
          playerId: 2,
          gameId: 1,
          pointsAgainst: 10,
          pointsFor: 30,
          controlGained: 4,
          controlLost: 3
        }),
        postgres.gamesplayers.create({
          gameId: 1,
          playerId: 1,
          onPitch: 'chaser'
        }),
        postgres.gamesplayers.create({
          gameId: 1,
          playerId: 2,
          onPitch: 'beater'
        })
      ]).then(function() {
        res.send('populated');
      });
    });
  });

  return baseRouter;
}

module.exports = {
	setupRoutes: setupRoutes
};
