const express = require('express')

const { Op } = require('sequelize');


const { Spot ,SpotImage, User,Review,ReviewImage,Booking} = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const { check } = require('express-validator');

const router = express.Router();

const validateEditBooking = [
    check('endDate').custom((value,{req})=>{
        if(value<req.body.startDate){
            throw new Error("endDate cannot be on or before startDate")
        }
    })
]


//get current user's booking
router.get('/current',async(req,res)=>{
    const{user} = req;
    if(user){
        const bookings = await Booking.findOne({
            where:{
                userId:user.id
            },
            include:[
                {
                    model:Spot
                }
            ],
        })
        return res.json(bookings);

    }else{
        return res.status(401).json({
            message:"Authentication required"
        })
    }

})
//edit booking
router.put('/:bookingId',validateEditBooking,async(req,res)=>{
    const{user} = req;
    if(user){
        const bookingToUpdate = await Booking.findByPk(parseInt(req.params.bookingId))
        if(bookingToUpdate.userId!==user.id){
            return res.status(403).json({
                message:"Forbidden"
            })
        }
        let {startDate,endDate} = req.body;
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        console.log('STARTDATE'+startDate)
        const conflictBooking = await Booking.findOne({
            where:{
                [Op.or]:[
                    {startDate:{
                        [Op.and]:[
                            {
                            [Op.gte]:startDate    
                            },
                            {
                            [Op.lt]:endDate
                            }
                        ]
                    }
                },
                {
                    endDate:{
                        [Op.and]:[
                            {
                                [Op.lte]:endDate
                            },
                            {
                                [Op.gt]:startDate
                            }
                        ]
                    }
                },
                {
                    [Op.and]:[
                        {startDate:{
                            [Op.gte]:startDate
                        }},
                        {
                            endDate:{
                                [Op.lte]:endDate
                            }
                        }
                    ]
                }
                ]
                
            }
        })
       
        
        if(conflictBooking){
            return res.status(403).json(
                {
                    message: "Sorry, this spot is already booked for the specified dates",
                    errors: {
                      "startDate": "Start date conflicts with an existing booking",
                      "endDate": "End date conflicts with an existing booking"
                    }
                  }
            )
        }
       
        
        if(startDate) {startDate = new Date(startDate);bookingToUpdate.set(startDate)}
        if(endDate) {endDate = new Date(endDate);bookingToUpdate.set(endDate)}
        await bookingToUpdate.save();
        return res.json(bookingToUpdate);


    }else{
        return res.status(401).json({
            message:"Authentication required"
        })
    }

});

//delete booking
router.delete('/:bookingId',async(req,res)=>{
    const{user} = req;
    if(user){
        const bookingToDelete = await Booking.findByPk(parseInt(req.params.bookingId))
        if(bookingToDelete.userId!==user.id){
            return res.status(403).json({
                message:"Forbidden"
            })
        }
        await bookingToDelete.destroy();
        return res.json({
            message: "Successfully deleted"
          })

    }else{
        return res.status(401).json({
            message:"Authentication required"
        })
    }

})




module.exports = router;