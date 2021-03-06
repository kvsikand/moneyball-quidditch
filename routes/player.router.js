'use strict';

var express = require('express');

module.exports = function(postgres) {
  var Player = postgres.models.player;
  var router = express.Router(); // eslint-disable-line new-cap

  router.get('/', (req, res) => {
    // TODO
    // 1. determine if req for one object or multiple
    // 2. check user permissions
    // 3. request object(s) from the model
    Player.findAll()
      .then(data => {
        res.send(data);
      }).catch(err => {
        console.error(err);
        res.send(err)
      });
  });

  router.get('/:id', (req, res) => {
    Player.findOne({
      where: { id: req.params.id },
      include: [
        { model: postgres.models.stats_beater, as: 'stats_beaters'},
        { model: postgres.models.stats_chaser, as: 'stats_chasers'}
      ]
    }).then(data => {
      res.send(data);
    }).catch(err => {
      console.error(err);
      res.send(err);
    })
  });

  return router;
};
