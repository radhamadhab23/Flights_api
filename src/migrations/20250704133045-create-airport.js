'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Airports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      // Assuming cityId is a foreign key referencing a City model
      // If you have a City model, you can set up the association later
      // For now, we just define it as an integer
      // If you want to enforce foreign key constraints, you can do so in the model definition
      // or in the migration file by adding a foreign key constraint
      // For example:   

      // references: {
      //   model: 'Cities', // Assuming you have a Cities table 
      //   key: 'id'
      // },
      // onDelete: 'CASCADE', // Optional: specify what happens on delete
      // onUpdate: 'CASCADE' // Optional: specify what happens on update
      // },
      // If you want to enforce foreign key constraints, you can do so in the model definition
      // or in the migration file by adding a foreign key constraint
      // For example: 
      // references: {
      //   model: 'Cities', // Assuming you have a Cities table
      //   key: 'id'
      // }, 


      cityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Airports');
  }
};