var models = ['player', 'stats_beater', 'stats_chaser', 'game', 'gamesplayers'];
var Sequelize = require('sequelize');

function setupAssociations(postgres) {
  postgres.stats_beater.belongsTo(postgres.player);
  postgres.player.hasMany(postgres.stats_beater);
  postgres.stats_chaser.belongsTo(postgres.player);
  postgres.player.hasMany(postgres.stats_chaser);

  postgres.stats_beater.belongsTo(postgres.game);
  postgres.game.hasMany(postgres.stats_beater);
  postgres.stats_chaser.belongsTo(postgres.game);
  postgres.game.hasMany(postgres.stats_chaser);

  postgres.game.belongsToMany(
    postgres.player,
    { through: postgres.gamesplayers }
  );
  postgres.player.belongsToMany(
    postgres.game,
    { through: postgres.gamesplayers }
  );
}

function defineModels(postgres) {
  models.forEach(function(model) {
    postgres[model] = require(`./${model}.model`)(postgres, Sequelize);
  });

  setupAssociations(postgres);
}

module.exports = {
  defineModels: defineModels
};
