'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Flights', [
      {
        flightNumber: 'UK808',
        airplaneId: 12,
        departureAirportId: 'BLR',
        arrivalAirportId: 'MUM',
        departureTime: new Date('2025-07-12T10:00:00'),
        arrivalTime: new Date('2025-07-12T12:30:00'),
        price: 4500,
        boardingGate: 'A3',
        totalSeats: 180,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // add more if needed
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', null, {});
  }
};
