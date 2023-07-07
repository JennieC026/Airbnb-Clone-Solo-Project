'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options,[
     {
      spotId:1,
      url:'https://cdn.discordapp.com/attachments/811082976501825539/1126535508126871633/AF1QipN0-mJ4M1ftzod1vtrdwMyE2fmmqxGdPxnvQMH4s680-w680-h510.png',
      preview:true
     },
     {
      spotId:2,
      url:'https://cdn.discordapp.com/attachments/811082976501825539/1126536554865754112/union.png',
      preview:true
     },
     {
      spotId:1,
      url:'https://upload.wikimedia.org/wikipedia/commons/9/9d/Golden_Gate_Bridge_.JPG',
      preview:false
     },
     {
      spotId:1,
      url:'https://pixabay.com/photos/panorama-golden-gate-bridge-2154194/',
      preview:false
     },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      url:{[Op.in]:['https://cdn.discordapp.com/attachments/811082976501825539/1126535508126871633/AF1QipN0-mJ4M1ftzod1vtrdwMyE2fmmqxGdPxnvQMH4s680-w680-h510.png',
      'https://cdn.discordapp.com/attachments/811082976501825539/1126536554865754112/union.png',
      'https://upload.wikimedia.org/wikipedia/commons/9/9d/Golden_Gate_Bridge_.JPG',
      'https://pixabay.com/photos/panorama-golden-gate-bridge-2154194/'

    ]},
      
    },{})
  }
};
