'use strict';
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
    roles: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User;
};