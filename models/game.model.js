var Game = function model(postgres, DataTypes) {

  return postgres.define('game', {
    name: DataTypes.STRING,
    finished: DataTypes.DATE
  });

};

module.exports = Game;
