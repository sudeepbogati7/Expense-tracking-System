'use strict';
const { QueryInterface, DataTypes } = require('sequelize');
module.exports = {
  up: (queryInterface : any, Sequelize : any) => {
    return queryInterface.createTable('users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [5, 50], 
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, 
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      confirmPassword: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface  : any, Sequelize : any) => {
    return queryInterface.dropTable('users');
  },
};