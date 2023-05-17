'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options,[
      {
        ownerId:1,
        address:'123 Disney Lane',
        city:"San Francisco",
        state:"California",
        country:"United States of America",
        lat:37.7645358,
        lng:-122.4730327,
        name:"App Academy",
        description:"Place where web developers are created",
        price:123
      },
      {
        ownerId:1,
        address:'999 Delicious Restaurant Blvd',
        city:"Los Angeles",
        state:"California",
        country:"United States of America",
        lat:34.137651,
        lng:-118.164625,
        name:"Good Good Restaurant",
        description:"The best restaurant in the world",
        price:50
      },
      {
        ownerId:2,
        address:'122 Some Blvd',
        city:"Gravity Fall",
        state:"Oregon",
        country:"United States of America",
        lat:44.999509,
        lng:-122.024539,
        name:"Mystery Shack",
        description:"A mystery place to spend all your money",
        price:999
      },
     
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      name:{[Op.in]:['App Academy','Good Good Restaurant','Mystery Shack']},
      
    },{})
  }
};
