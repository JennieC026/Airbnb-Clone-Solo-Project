import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchCreateReviews } from "../../store/review";
import { fetchSpot } from "../../store/spots";


import "./CreateReview.css";


function CreateReviewModal({spotId}) {
    const [errors, setErrors] = useState({});
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleStarHover = (index) =>{
      setHoveredStar(index);
    }
    

    useEffect(()=>{
        let errors = {};
        

        if(review.length<10){
            errors.review = "Review must have 10 characters or more."
        }
        if(stars===0){
            errors.stars = 'Star rating is required.'
        }
        setErrors(errors);
    },[review,stars])

   

  


  const handleCreateClick = async (spotId) =>{
    const reviewToSend={review,stars}
    
    try {
      const newReview = await dispatch(fetchCreateReviews(spotId,reviewToSend));
      dispatch(fetchSpot(spotId))
      closeModal();
  } catch (error) {
  const  errorData = await error.json()
  if(errorData.message==="User already has a review for this spot"){
    setErrors({...errors,apiError: errorData.message});

  }else{

    setErrors({...errors,apiError: errorData.errors});
  }

      
      
  }

}
  const starRating = (<div> {[...Array(5)].map((star,index)=>{
    index += 1;
    return (
        <button
        type="button"
        key={index}    
        id="star-button"
        onClick={()=>{setStars(index)}} 
        onMouseEnter={() => handleStarHover(index)}  
        onMouseLeave={() => handleStarHover(0)}          
        >
        <i className={`fa-${index<=(hoveredStar||stars)?'solid':'regular'} fa-star`}
        style={{cursor:'pointer'}}></i>
        </button>
    )
})}</div>)

  return (
    <div>
        <h1>How was your stay?</h1>
        {errors.apiError && <div className="errors">{errors.apiError}</div>}
    <textarea type='text' placeholder="Leave your review here... 
" value = {review} onChange={e=>setReview(e.target.value)}></textarea>
 {errors.review && <div className="errors">{errors.review}</div>}

   {starRating}<label>Stars</label>
   {errors.stars && <div className="errors">{errors.stars}</div>}

<button onClick={()=>handleCreateClick(spotId)} disabled={!!Object.keys(errors).length}>Submit Your Review
</button>
       </div>
      
  );
}

export default CreateReviewModal;