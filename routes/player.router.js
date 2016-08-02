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
      .then(data => res.send(data)).catch(err => res.send(err));
  });

  router.post('/', (req, res) => {
    // TODO
    // 1. validate incoming data
    // 2. send validated to model for creation
    Player.create(req.body)
      .then(data => res.send(data)).catch(err => res.send(err));
  });

  router.put('/:playerId', (req, res) => {
    // TODO
    // 1. validate incoming data
    // 2. check user's permissions
    // 3. send validated data to model for update
    // eslint-disable-next-line no-magic-numbers
    res.sendStatus(500);
  });

  router.delete('/:playerId', (req, res) => {
    // TODO
    // 1. check user permissions
    // 2. log username and metadata into seperate log file
    // 3. send deletion request to model
    // eslint-disable-next-line no-magic-numbers
    res.sendStatus(500);
  });

  return router;
};
