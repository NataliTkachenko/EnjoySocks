'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pattern extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Sock}) {
      this.hasMany(Sock, { foreignKey: "sock_id"})
    }
  }
  Pattern.init({
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pattern',
  });
  return Pattern;
};