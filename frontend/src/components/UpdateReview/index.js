import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchUpdateReviews } from "../../store/review";
import { fetchSpots } from "../../store/spots";


import "./UpdateReview.css";


function UpdateReviewModal({originReview}) {
    const spots = useSelector(state=>state.spots.allSpots);
    const spot = spots.find(ele=>ele.id===originReview.spotId)
    const [errors, setErrors] = useState({});
    const [review, setReview] = useState(originReview.review);
    const [stars, setStars] = useState(originReview.stars);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchSpots())
    },[dispatch]);
    

    useEffect(()=>{
        let errors = {};
        

        if(review.length<10){
            errors.review = "Review must have 10 character or more."
        }
        setErrors(errors);
    },[review])

    if(spots.length===0){
        return(<div><h2>Loading...</h2></div>)
    }


  


  const handleUpdateClick = async () =>{
    const reviewToSend={...originReview,stars:stars,review:review}
    
    try {
      const newReview = await dispatch(fetchUpdateReviews(reviewToSend));
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
        <h1>How was your stay at{spot.name}?</h1>
        {errors.apiError && <div className="errors">{errors.apiError}</div>}
    <textarea type='text' placeholder="Leave your review here... 
" value = {review} onChange={e=>setReview(e.target.value)}></textarea>
 {errors.review && <div className="errors">{errors.review}</div>}

   {starRating}

<button onClick={()=>handleUpdateClick()} disabled={!!Object.keys(errors).length}>Update Your Review
</button>
       </div>
      
  );
}

export default UpdateReviewModal;