var express = require('express');
var _ = require('lodash');
var promise = require('bluebird');

module.exports = function(postgres) {
  var Game = postgres.models.game;
  var Player = postgres.models.player;
  var StatsBeater = postgres.models.stats_beater;
  var StatsChaser = postgres.models.stats_chaser;
  var router = express.Router(); // eslint-disable-line new-cap

  router.get('/score/:playerId', (req, res) => {
    Game.findAll({
      where: {
        finished: {
          $ne: null
        }
      },
      include: [
        { 
          model: postgres.models.player,
          as: 'players',
          include: [
            { model: StatsBeater, as: 'stats_beaters' },
            { model: StatsChaser, as: 'stats_chasers' },
          ]
        },
      ]
    }).then(data => {
      if (data.length > 1) {
        throw new Error('Should only have one game that is not finished');
      }
      var game = data[0];

      promise.all(game.players.map(function(player) {
        var position = player.gamesplayers.onPitch;
        var statToUpdate;
        function updateStat(stat) {
          var updateData = {
            pointsFor: stat.get('pointsFor') + 10
          };

          if (player.id == req.params.playerId) {
            updateData.pointsScored = stat.get('pointsScored') + 10;
          }

          return stat.update(updateData);
        }

        if (position === 'chaser') {
          statToUpdate = _.find(player.stats_chasers, { gameId: game.id });
          if (statToUpdate) {
            return updateStat(statToUpdate);
          } else {
            var createData = {
              pointsFor: 10,
              gameId: game.id,
              playerId: player.id
            };
            if (player.id == req.params.playerId) {
              createData.pointsScored = 10;
            }
            return StatsChaser.create(createData);
          }
        } else if (position === 'beater') {
          statToUpdate = _.find(player.stats_beaters, { gameId: game.id });
          if (statToUpdate) {
            return updateStat(statToUpdate);
          } else {
            var createData = {
              pointsFor: 10,
              gameId: game.id,
              playerId: player.id
            };
            return StatsBeater.create(createData);
          }
        }
      }));

      res.send(data);
    }).catch(err => {
      console.error(err);
      res.send(err);
    });
  });

  return router;
};
