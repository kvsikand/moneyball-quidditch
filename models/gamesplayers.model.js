var GamesPlayers = function model(postgres, DataTypes) {

  return postgres.define('gamesplayers', {
    gameId: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER,
    onPitch: DataTypes.STRING
  });

};

module.exports = GamesPlayers;
