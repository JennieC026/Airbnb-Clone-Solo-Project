const express = require('express')

const { Op } = require('sequelize');
const { Spot ,SpotImage, User, ReviewImage, Review, Booking} = require('../../db/models');


const { check } = require('express-validator');

const router = express.Router();

router.delete('/:reviewId',async(req,res)=>{
    const {user} = req;
    if(user){
        const reviewImage =await ReviewImage.findOne({
            where:{
                id:req.params.reviewId
            },
            include:{
                model:Review,
                as:'Review',
                attribute:['userId']
            }
        });
        if(!reviewImage){
            return res.status(404).json(
                {
                    message: "Review Image couldn't be found"
                  }
            )
        }
        if(reviewImage.Review.userId!==user.id){
            return res.status(403).json({
                message:"Forbidden"})
        }
        await reviewImage.destroy();
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