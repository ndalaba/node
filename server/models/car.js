'use strict';
module.exports = function (sequelize, DataTypes) {
  var Car = sequelize.define('Car', {
    identifiant: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    color: DataTypes.STRING,
    release_year: DataTypes.DATE,
    fuel: DataTypes.STRING,
    transmission: DataTypes.STRING,
    mileage: DataTypes.INTEGER,
    wheel: DataTypes.INTEGER,
    pol: DataTypes.STRING,
    pod: DataTypes.STRING,
    origin: DataTypes.STRING
  });

  Car.associate = (models) => {
    Car.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      onDelete: 'CASCADE'
    });
    Car.belongsTo(models.Model, {
      foreignKey: 'model_id',
      onDelete: 'CASCADE'
    })
  }

  return Car;
};