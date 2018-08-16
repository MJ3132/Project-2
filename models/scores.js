module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define("Score", {
    scores: DataTypes.INTEGER
  });

  Score.associate = function(models) {
    Score.belongsTo(models.User, {
      foreignKey: {
        allownull: false
      }
    });
  };
  return Score;
};
  