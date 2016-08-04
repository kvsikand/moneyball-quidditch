var StatsChaser = function model(postgres, DataTypes) {

  return postgres.define('stats_chaser', {
    playerId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    pointsAgainst: { type: DataTypes.INTEGER, defaultValue: 0 },
    pointsFor: { type: DataTypes.INTEGER, defaultValue: 0 },
    pointsScored: { type: DataTypes.INTEGER, defaultValue: 0 },
    turnovers: { type: DataTypes.INTEGER, defaultValue: 0 }
  });

};

module.exports = StatsChaser;
