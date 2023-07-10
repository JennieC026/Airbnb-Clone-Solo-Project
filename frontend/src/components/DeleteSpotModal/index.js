import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchDeleteSpot } from "../../store/spots";

import "./DeleteSpot.css";

function DeleteSpotModal({spotId}) {
    const [errors, setErrors] = useState({});

    const { closeModal } = useModal();
    const dispatch = useDispatch();

   

  

 

  const handleDeleteClick =async (spotId) =>{
   await dispatch(fetchDeleteSpot(spotId))
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
    <div>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this spot
from the listings?</p>
         <button id="delete-button-yes"onClick={()=>handleDeleteClick(spotId)}>{'Yes (Delete Spot)'}</button>
         <button id='delete-button-no' onClick={handleCancelDeleteClick}>{'No (Keep Spot)'}</button>
       </div>
      
  );
}

export default DeleteSpotModal;