'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('brands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('brands');
  }
};