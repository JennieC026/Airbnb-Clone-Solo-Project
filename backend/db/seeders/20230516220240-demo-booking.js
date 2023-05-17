'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options,[
     {
      spotId:1,
      userId:2,
      startDate:"2023-11-19",
      endDate:'2023-11-20',
     },
     {
      spotId:2,
      userId:3,
      startDate:"2023-9-19",
      endDate:'2023-9-20',
     },
     {
      spotId:3,
      userId:3,
      startDate:"2023-9-10",
      endDate:'2023-9-15',
     },

    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      startDate:{[Op.in]:["2023-11-19","2023-9-19","2023-9-10"]},
      
    },{})
  }
};
