const express = require('express')

const { Op } = require('sequelize');


const { Spot ,SpotImage, User,Review,ReviewImage} = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const { check } = require('express-validator');

const router = express.Router();

router.get('/current',async(req,res)=>{
    const {user} = req;
    if(user){
        const id = user.id;
        const reviews = await Review.findAll({
            where:{
                userId:id
            }
        });
        return res.json(reviews)

    }else{
        return res.status(401).json({
            message:"Authentication required"})
    }
})





module.exports = router;