import {useEffect}from'react';
import{useDispatch,useSelector}from'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { fetchUserReviews } from '../../store/review';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from '../DeleteReviewModal';
import UpdateReviewModal from '../UpdateReview';
import './OwnedReview.css'

function OwnedReviews(){
    const dispatch = useDispatch();
    const history = useHistory();
    const reviews = useSelector(state=>state.reviews.user||null);

    useEffect(()=>{
        dispatch(fetchUserReviews())
    },[dispatch]);

    if(reviews===null){
        return(<div><h2>Loading...</h2></div>)
    }

    if(reviews.length===0){
        return(<div><h2>No Reviews</h2></div>)
    }

    return(<div>
        <h1>   Manage Reviews</h1>
        <ol className='get-user-reviews'>
            {reviews.map((review)=>(
                <li key={review.id}>
                    <div className='manage-reviews-list'>
                    <h2>{review.Spot.name}</h2>
                    <div> {new Date(review.updatedAt).toLocaleDateString('en-US',{year:'numeric',month:'long'})}</div>
                     <div>{review.review}</div>
                    
                    </div>
                    
                    <div>
                    
                      <OpenModalButton
                    className='cursor-button'
                      buttonText="Update"
                      modalComponent={<UpdateReviewModal originReview={review}/>}/>
                      <OpenModalButton
                    className='cursor-button'
                      buttonText="Delete"
                      modalComponent={<DeleteReviewModal reviewId={review.id}/>}/>
                    </div>
                </li>
            ))}
        </ol>
    </div>)

}

export default OwnedReviews;