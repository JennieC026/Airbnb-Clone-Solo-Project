import {useEffect}from'react';
import{useDispatch,useSelector}from'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { fetchUserReviews } from '../../store/review';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from '../DeleteReviewModal';
import UpdateReviewModal from '../UpdateReview';

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
        Manage Reviews
        <ol className='get-user-reviews'>
            {reviews.map((review)=>(
                <li key={review.id}>
                    {review.Spot.name}
                    {review.updatedAt}
                    {review.review}
                    <div><button>Update</button>
                    <OpenModalButton
                    className='cursor-button'
                      buttonText="Delete"
                      modalComponent={<DeleteReviewModal reviewId={review.id}/>}/>
                      <OpenModalButton
                    className='cursor-button'
                      buttonText="Update"
                      modalComponent={<UpdateReviewModal originReview={review}/>}/>
                    </div>
                </li>
            ))}
        </ol>
    </div>)

}

export default OwnedReviews;