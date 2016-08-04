var StatsBeater = function model(postgres, DataTypes) {

  return postgres.define('stats_beater', {
    playerId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    pointsAgainst: { type: DataTypes.INTEGER, defaultValue: 0 },
    pointsFor: { type: DataTypes.INTEGER, defaultValue: 0 },
    controlGained: { type: DataTypes.INTEGER, defaultValue: 0 },
    controlLost: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

};

module.exports = StatsBeater;
