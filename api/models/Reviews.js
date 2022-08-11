const S = require('sequelize');
const db = require('../db');

class Reviews extends S.Model {}

Reviews.init(
  {
    review: {
      type: S.TEXT,
    },
    rating: {
      type: S.INTEGER,
    },
  },
  { sequelize: db, modelName: 'reviews' }
);

module.exports = Reviews
