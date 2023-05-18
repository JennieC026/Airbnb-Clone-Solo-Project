'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User,{as:'Owner',foreignKey:'ownerId'})
      Spot.hasMany(models.SpotImage,{foreignKey:'spotId',onDelete:'CASCADE'})//on CASCADE?
      Spot.hasMany(models.Review,{foreignKey:'spotId',onDelete:'CASCADE'})
      Spot.hasMany(models.Booking,{foreignKey:'spotId',onDelete:'CASCADE'})
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    address:{
      type:DataTypes.STRING,
      allowNull:false
    },
    city: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        min:-90,
        max:90
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        min:-180,
        max:180
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        len:[1,50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull:false,
    },
    numReviews:{
      type:DataTypes.INTEGER,
    },
    avgStarRating: {
      type: DataTypes.DECIMAL
    }
   
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};