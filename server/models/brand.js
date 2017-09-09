'use strict';
module.exports = function (sequelize, DataTypes) {
  var Brand = sequelize.define('Brand', {
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false
  });

  Brand.associate = (models) => {
    Brand.hasMany(models.Model, {
      foreignKey: 'brand_id',
      as: 'models'
    })
  }
  return Brand;
};