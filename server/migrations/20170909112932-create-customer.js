'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      identity_type: {
        type: Sequelize.ENUM,
        values: ['Passeport', "Carte d'identité", 'Titre de sejour']
      },
      identity_number: {
        type: Sequelize.STRING
      },
      identity_delivred: {
        type: Sequelize.DATE
      },
      identity_expire: {
        type: Sequelize.DATE
      },
      photo: {
        type: Sequelize.STRING
      },
      driver_licence: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('customers');
  }
};