'use strict';

const spot = require('../models/spot');

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
      url:'https://img.rawpixel.com/private/static/images/website/2022-05/upwk61661577-wikimedia-image-kowapeej.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=14769aec7c86811c0c7e4eb29fa4a76e',
      preview:true
     },
     {
      spotId:1,
      url:'https://upload.wikimedia.org/wikipedia/commons/9/9d/Golden_Gate_Bridge_.JPG',
      preview:false
     },
     {
      spotId:1,
      url:'https://assets.editorial.aetnd.com/uploads/2015/02/topic-golden-gate-bridge-gettyimages-177770941.jpg',
      preview:false
     },
     {
      spotId:1,
      url:'https://cdn.pixabay.com/photo/2023/01/20/07/44/sunset-7730982_1280.jpg',
      preview:false
     },
     {
      spotId:1,
      url:'https://p1.pxfuel.com/preview/769/660/944/golden-gate-bridge-suspension-san-francisco-california.jpg',
      preview:false
     },
     {
      spotId:2,
      url:'https://c1.wallpaperflare.com/preview/260/821/271/bangkok-chairs-dining-photos.jpg',
      preview:false
     },
     {
      spotId:2,
      url:'https://cdn.pixabay.com/photo/2022/09/28/12/35/loughton-restaurants-7484984_1280.jpg',
      preview:false
     },{
      spotId:2,
      url:'https://media-cdn.tripadvisor.com/media/photo-s/0e/2b/3e/6a/pagoda-chinese-restaurant.jpg',
      preview:false
     },{
      spotId:2,
      url:'https://p1.pxfuel.com/preview/831/539/592/dining-in-goa-restaurants-in-goa-hotel-restaurants-goa.jpg',
      preview:false
     },
     {
      spotId:3,
      url:'https://ap.rdcpix.com/1165ba7b703e5dafe69a8eb029ceef54l-m2741713655od-w480_h360.jpg',
      preview:true
     },
     {
      spotId:3,
      url:'https://cdn.pixabay.com/photo/2015/04/05/01/35/beach-house-707304_1280.jpg',
      preview:false
     },{
      spotId:3,
      url:'https://assets.editorial.aetnd.com/uploads/2015/02/topic-golden-gate-bridge-gettyimages-177770941.jpg',
      preview:false
     },{
      spotId:3,
      url:'https://p1.pxfuel.com/preview/654/943/642/ocean-front-orange-county-mansion-corona-del-mar.jpg',
      preview:false
     },{
      spotId:3,
      url:'https://ap.rdcpix.com/bb893aaf19274e8e23fa08086113ecf6l-m3421656976od-w480_h360.jpg',
      preview:false
     },
     {
      spotId:4,
      url:'https://www.theagencyre.com/blog/wp-content/uploads/2015/01/799.jpg',
      preview:true
     },
     {
      spotId:4,
      url:'https://www.wealthmanagement.com/sites/wealthmanagement.com/files/apartments-new-york-city_0.jpg',
      preview:false
     },{
      spotId:4,
      url:'https://www.zillowstatic.com/bedrock/app/uploads/sites/26/nyc-apartments-for-1800-cobble-hill-d08725.jpg',
      preview:false
     },{
      spotId:4,
      url:'https://www.zillowstatic.com/bedrock/app/uploads/sites/26/nyc-apartments-for-400k-jackson-heights-9faee5.jpeg',
      preview:false
     },{
      spotId:4,
      url:'https://www.zillowstatic.com/bedrock/app/uploads/sites/26/nyc-apartments-for-400k-kensington-2d8e8c.jpeg',
      preview:false
     },
     {
      spotId:5,
      url:'https://cdn.discordapp.com/attachments/811082976501825539/1143378396181692497/banner.jpg',
      preview:true
     },
      {
      spotId:5,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-48089233/original/32e6234f-2f32-4b7c-8137-ee81e9f6c7d1.jpeg?im_w=1200',
      preview:false
      },
      {
      spotId:5,
      url:'https://a0.muscache.com/im/pictures/9c6f8dd9-9758-4ef3-80b0-16cdbbda5118.jpg?im_w=720',
      preview:false
      },
      {
      spotId:5,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-48089233/original/5d43315c-91ac-41ad-a7c3-ca2672834743.jpeg?im_w=720',
      preview:false
      },
      {
      spotId:5,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-48089233/original/ab307e76-ad60-4ee5-8a16-176c8aeb14be.jpeg?im_w=720',
      preview:false
      },
      {
        spotId:6,
        url:'https://a0.muscache.com/im/pictures/a7f4f722-8787-42a7-8d48-7a12953844ed.jpg?im_w=960',
        preview:true
      },
      {
        spotId:6,
        url:'https://a0.muscache.com/im/pictures/5135a2b7-4ffc-492f-b03e-ef31a3dd2149.jpg?im_w=480',
        preview:false
      },
      {
        spotId:6,
        url:'https://a0.muscache.com/im/pictures/c661be16-0106-4dd6-82b9-12c5e80c5a0a.jpg?im_w=480',
        preview:false
      },
      {
        spotId:6,
        url:'https://a0.muscache.com/im/pictures/d88699dc-61f5-454a-a383-7e43c93ca4fe.jpg?im_w=480',
        preview:false
      },
      {
        spotId:6,
        url:'https://a0.muscache.com/im/pictures/f55ae780-88df-485f-bdc9-50287e72a411.jpg?im_w=480',
        preview:false
      },
      {
        spotId:7,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-43770721/original/3df62b31-d43e-45bc-adb9-5be12570f78e.jpeg?im_w=960',
        preview:true
      },
      {
        spotId:7,
        url:'https://a0.muscache.com/im/pictures/98b2c430-ab79-40f7-bfea-a1ccd48af3ec.jpg?im_w=480',
        preview:false
      },
      {
        spotId:7,
        url:'https://a0.muscache.com/im/pictures/31a643ca-fdb6-4f6c-8527-d22c0265a507.jpg?im_w=720',
        preview:false
      },
      {
        spotId:7,
        url:'https://a0.muscache.com/im/pictures/44f74b8f-0c6c-4f38-a43e-1285e1e19f65.jpg?im_w=720',
        preview:false
      },
      {
        spotId:7,
        url:'https://a0.muscache.com/im/pictures/6f9991c1-3102-45a8-a03d-e35054bdff02.jpg?im_w=720',
        preview:false
      }





    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      spotId:{[Op.in]:[1,2,3,4,5

    ]},
      
    },{})
  }
};
