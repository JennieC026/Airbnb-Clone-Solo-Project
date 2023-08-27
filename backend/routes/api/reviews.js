const express = require('express')

const { Op } = require('sequelize');


const { Spot ,SpotImage, User,Review,ReviewImage} = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const { check } = require('express-validator');

const router = express.Router();

const validateReview = [
    check('review').exists({checkFalsy:true}).withMessage("Review text is required"),
    check('stars').exists({checkFalsy:true}).isInt({min:1,max:5}).withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors

 ]
 const validateEditReview = [
    check('review').optional().notEmpty().withMessage("Review text is required"),
    check('stars').isInt({min:1,max:5}).withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors

 ]

router.get('/current',async(req,res)=>{
    const {user} = req;
    if(user){
        const id = user.id;
        const reviews = await Review.findAll({
            where:{
                userId:id
            },
            include:[
                {
                    model:User,
                    attributes:['id','firstName','lastName']

                },
                {
                    model:Spot,
                    attributes:['id','ownerId','address','city','state','country','lat','lng','name','price','previewImage']
                },
                {
                    model:ReviewImage,
                    attributes:['id','url']
                }
            ]
        });
        return res.json({Reviews:reviews})

    }else{
        return res.status(401).json({
            message:"Authentication required"})
    }
})

//create image for a review
router.post('/:reviewId/images',async(req,res)=>{
    const {user} = req;
    if(user){
        const id = user.id;
        const ownedReview = await Review.findByPk(parseInt(req.params.reviewId),{
            include:{
                model:ReviewImage,
                as:'ReviewImages'
            }
        })
            if(!ownedReview){
                return res.status(404).json({
                    message:"Review couldn't be found"
                })
            }
             if(ownedReview.ReviewImages.length>=10){
                return res.status(404).json({
                    message:"Maximum number of images for this resource was reached"
                })
             }
              
            
        if(ownedReview.userId===id){
            const {url} = req.body
            const newImage = await ReviewImage.create({
                reviewId:req.params.reviewId,
                url,
            });
            return res.json(newImage);
        }else{
            return res.status(403).json({
                message:"Forbidden"
            })
        }

        

    }
    return res.status(401).json({
        message:"Authentication required"
    })
})

//edit a review

router.put('/:reviewId',validateEditReview,async(req,res)=>{
    const {user}=req;
    if(user){
        const reviewToUpdate = await Review.findByPk(parseInt(req.params.reviewId));
        if(reviewToUpdate){
            if(reviewToUpdate.userId===user.id){
                const{review,stars} = req.body;
                if(review)reviewToUpdate.set({review});
                if(stars)reviewToUpdate.set({stars});
                await reviewToUpdate.save();
                
                return res.json(reviewToUpdate)

            }else{
                return res.status(403).json({
                    message:"Forbidden"})
            }

        }else{
            return res.status(404).json({
                message:"Review couldn't be found"})
        }

    }else{
        return res.status(401).json({
            message:"Authentication required"
        })
    }
})

router.delete('/:reviewId',async(req,res)=>{
    const{user}=req;
    if(user){
        const reviewToDelete = await Review.findByPk(parseInt(req.params.reviewId));
        if(reviewToDelete){
            if(reviewToDelete.userId===user.id){
                const spotId = reviewToDelete.spotId
                await reviewToDelete.destroy();
                const totalStars =await Review.sum('stars',{
                    where:{
                        spotId:spotId
                    }
                })
                const updatedSpot = await Spot.findByPk(parseInt(spotId),{
                    include:[
                        {
                            model:Review,
                            as:'Reviews'
                        }
                    ]
                });
                let notRoundedStarRating;
                if(updatedSpot.Reviews.length===0){
                     notRoundedStarRating = 0
                }else{
                    notRoundedStarRating = totalStars/updatedSpot.Reviews.length;

                }
                 
                updatedSpot.avgStarRating = Number(notRoundedStarRating).toFixed(2);
                updatedSpot.numReviews = updatedSpot.Reviews.length;
                
                await updatedSpot.save();
                return res.json({
                    message:"Successfully deleted"
                })
            }else{
                return res.status(403).json({
                    message:"Forbidden"})
            }
        }else{
            return res.status(404).json({
                message:"Review couldn't be found"})
        }
    }
    return res.status(401).json({
        message:"Authentication required"})
})




module.exports = router;