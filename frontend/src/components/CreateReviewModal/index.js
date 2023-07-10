import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchCreateReviews } from "../../store/review";


import "./CreateReview.css";


function CreateReviewModal({spotId}) {
    const [errors, setErrors] = useState({});
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    

    useEffect(()=>{
        let errors = {};
        

        if(review.length<10){
            errors.review = "Review must have 10 character or more."
        }
        setErrors(errors);
    },[review])

   

  


  const handleCreateClick = async (spotId) =>{
    const reviewToSend={review,stars}
    
    try {
      const newReview = await dispatch(fetchCreateReviews(spotId,reviewToSend));
      closeModal();
  } catch (error) {
  const  errorData = await error.json()
  if(errorData.message==="User already has a review for this spot"){
    setErrors({apiError: errorData.message});

  }else{

    setErrors({apiError: errorData.errors});
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
        onClick={()=>setStars(index)}             
        >
        <i className={`fa-${index<=stars?'solid':'regular'} fa-star`}
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

   {starRating}

<button onClick={()=>handleCreateClick(spotId)} disabled={!!Object.keys(errors).length}>Submit Your Review
</button>
       </div>
      
  );
}

export default CreateReviewModal;