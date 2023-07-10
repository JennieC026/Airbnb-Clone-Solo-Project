import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


import "./DeleteReview.css";
import { fetchDeleteReview } from "../../store/review";

function DeleteReviewModal({reviewId}) {
    const [errors, setErrors] = useState({});

    const { closeModal } = useModal();
    const dispatch = useDispatch();

   

  

 

  const handleDeleteClick =async (reviewId) =>{
   await dispatch(fetchDeleteReview(reviewId))
    .then(closeModal)
    .catch(async(res)=>{
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
    });
}
   const handleCancelDeleteClick = () =>{
    closeModal();
   }

  return (
    <div className="delete-m">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?
</p>
         <button id="delete-button-yes"onClick={()=>handleDeleteClick(reviewId)}>{'Yes (Delete Review)'}</button>
         <button id='delete-button-no' onClick={handleCancelDeleteClick}>{'No (Keep Review)'}</button>
       </div>
      
  );
}

export default DeleteReviewModal;