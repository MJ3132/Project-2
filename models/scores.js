module.exports = function(sequelize, DataTypes) {
  var Scores = sequelize.define("Scores", {
    scores: DataTypes.INTEGER
  });
  return Scores;
};