const express = require('express')

const { Op } = require('sequelize');
const { Spot ,SpotImage, User, ReviewImage, Review, Booking} = require('../../db/models');


const { check } = require('express-validator');

const router = express.Router();

router.delete('/:imageId',async(req,res)=>{
    const {user} = req;
    if(user){
        const image =await SpotImage.findOne({
            where:{
                id:req.params.imageId
            },
            include:{
                model:Spot,
                as:'Spot',
                attribute:['ownerId']
            }
        });
        if(!image){
            return res.status(404).json(
                {
                    message: "Spot Image couldn't be found"
                  }
            )
        }
        if(image.Spot.ownerId!==user.id){
            return res.status(403).json({
                message:"Forbidden"})
        }
        await image.destroy();
        return res.json(
            {
                message: "Successfully deleted"
              }
        )

        



    }else{
        return res.status(401).json({
            message:"Authentication required"}) 
    }
})

module.exports = router;