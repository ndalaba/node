'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      identifiant: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING
      },
      release_year: {
        type: Sequelize.DATE
      },
      fuel: {
        type: Sequelize.STRING
      },
      transmission: {
        type: Sequelize.STRING
      },
      mileage: {
        type: Sequelize.INTEGER,
        comment: 'kilométrage',
      },
      wheel: {
        type: Sequelize.INTEGER,
        comment: 'Pneu'
      },
      pol: {
        type: Sequelize.STRING,
        comment: 'port of loading'
      },
      pod: {
        type: Sequelize.STRING,
        comment: 'port of debarquement'
      },
      origin: {
        type: Sequelize.STRING,
        comment: 'car origin'
      },
      customer_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        field: 'customer_id',
        references: {
          model: 'customers',
          key: 'id',
          as: 'customer_id'
        }
      },
      model_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        field: 'model_id',
        references: {
          model: 'models',
          key: 'id',
          as: 'model_id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('cars');
  }
};