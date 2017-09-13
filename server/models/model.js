'use strict';
module.exports = function (sequelize, DataTypes) {
  var Model = sequelize.define('Model', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false
  });

  Model.associate = (models) => {
    Model.belongsTo(models.Brand, {
      foreignKey: 'brand_id',
      onDelete: 'CASCADE'
    });
    Model.hasMany(models.Car, {
      foreignKey: 'model_id',
      as: 'cars'
    })
  }

  return Model;
};