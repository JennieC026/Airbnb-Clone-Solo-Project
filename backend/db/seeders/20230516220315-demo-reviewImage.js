'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options,[
     {
      reviewId:1,
      url:'image url1',
     },
     {
      reviewId:1,
      url:'image url2',
     },
     {
      reviewId:2,
      url:'image url3',
     },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      url:{[Op.in]:['image url1','image url2','image url3']},
      
    },{})
  }
};
