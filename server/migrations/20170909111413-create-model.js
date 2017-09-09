'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('models', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      brand_id:{
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        field: 'brand_id',
        references:{
          model: 'brands',
          key:'id',
          as: 'brand_id'
        }
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('models');
  }
};