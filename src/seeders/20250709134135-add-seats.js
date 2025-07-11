'use strict';

const { Enums } = require('../utils/common');
const { BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS, ECONOMY } = Enums.SEAT_TYPE;

const getSeatType = (row) => {
  if (row <= 2) return FIRST_CLASS;
  if (row <= 5) return BUSINESS;
  if (row <= 10) return PREMIUM_ECONOMY;
  return ECONOMY;
};

module.exports = { 
  async up(queryInterface, Sequelize) {
    // ✅ Dynamically get an existing airplaneId
    const airplanes = await queryInterface.sequelize.query(
      `SELECT id FROM airplanes LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const airplaneId = airplanes[0]?.id;

    if (!airplaneId) {
      throw new Error("❌ No airplane found. Please seed the Airplanes table first.");
    }

    const seats = [];
    const columns = ['A', 'B', 'C', 'D'];

    for (let row = 1; row <= 15; row++) {
      for (let col of columns) {
        seats.push({
          airplaneId: airplaneId,
          row: row,
          col: col,
          type: getSeatType(row),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('Seats', seats, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});
  }
};
