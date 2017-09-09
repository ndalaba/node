'use strict';
module.exports = function (sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identity_type: {
      type: DataTypes.STRING,
      values: ['Passeport', "Carte d'identité", 'Titre de sejour']
    },
    identity_number: DataTypes.STRING,
    identity_delivred: DataTypes.DATE,
    identity_expire: DataTypes.DATE,
    photo: DataTypes.STRING,
    driver_licence: DataTypes.BOOLEAN
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Car, {
      foreignKey: 'customer_id',
      as: 'cars'
    })
  }
  return Customer;
};