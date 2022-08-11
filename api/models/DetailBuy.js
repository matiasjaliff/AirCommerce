const S = require('sequelize');
const db = require('../db');

class DetailBuy extends S.Model {}

DetailBuy.init(
  {
    price_final: {
      type: S.DataTypes.INTEGER,
      allowNull: false,
    },
    products_buy: {
      type: S.DataTypes.ARRAY(S.DataTypes.JSON),
      allowNull: false,
    },
    state_buy: {
      type: S.DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    delivery: {
      type: S.DataTypes.STRING,
      allowNull: false,
    },
    payment: {
      type: S.DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'detailbuy',
  }
);
module.exports = DetailBuy;
