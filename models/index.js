'use strict';

var models = ['player'];
var Sequelize = require('sequelize');

function defineModels(postgres) {
  models.forEach(function(model) {
    postgres[model] = require(`./${model}.model`)(postgres, Sequelize);
    console.log('here is model', model);
  });
}

module.exports = {
  defineModels: defineModels
};
