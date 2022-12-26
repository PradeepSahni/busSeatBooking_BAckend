'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class busSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  busSeat.init({
    seatNo: DataTypes.INTEGER,
    busID: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    reserveBy: DataTypes.INTEGER,
    reserveAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'busSeat',
  });
  return busSeat;
};