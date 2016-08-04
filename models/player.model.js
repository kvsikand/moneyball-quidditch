var Player = function model(postgres, DataTypes) {

  return postgres.define('player', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
  });

};

module.exports = Player;
