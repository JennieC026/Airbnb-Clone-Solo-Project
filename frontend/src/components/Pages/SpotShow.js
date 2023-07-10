import {useEffect}from'react';
import{useDispatch,useSelector}from'react-redux'
import { fetchSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { fetchSpotReviews } from '../../store/review';
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from '../CreateReviewModal';
import DeleteReviewModal from '../DeleteReviewModal';

function SpotShow(){
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state=>state.spots.singleSpot?state.spots.singleSpot:null);
    const reviews = useSelector(state=>state.reviews.spot?state.reviews.spot:[]);
    const currentUserID = useSelector(state => state.session.user.id);
    
   
    

    useEffect(()=>{
        dispatch(fetchSpot(spotId))
    },[dispatch,spotId]);

    useEffect(()=>{
        dispatch(fetchSpotReviews(spotId))
    },[dispatch,spotId]);
    


    if(Object.keys(spot).length===0){
        return(
            <div>Loading...</div>
        )
    }
    let reviewBar;
    let reserveBar;
    if(reviews.length===0){
        reviewBar=(<div> <i className="fa-solid fa-star"></i>New  <OpenModalButton
        className='cursor-button'
          buttonText="Post Your Review"
          modalComponent={<CreateReviewModal spotId={spot.id}/>}/>
</div>
        );
        reserveBar=(<div><i className="fa-solid fa-star"></i>New</div>)

    }else{

        reviewBar = (<div><div><i className="fa-solid fa-star"></i>{spot.avgStarRating}</div>
         <OpenModalButton
        className='cursor-button'
          buttonText="Post Your Review"
          modalComponent={<CreateReviewModal spotId={spot.id}/>}/>

        <h2>Reviews</h2>
        <ol>
            {reviews.length > 0 && [...reviews].reverse().map((review)=>(
                <li key={review?.id}><h3>{review.User?.firstName}</h3><p>{review.updatedAt}</p><p>{review.review}</p>
                {review?.User.id === currentUserID && (
                    <OpenModalButton
                    className='cursor-button'
                      buttonText="Delete"
                      modalComponent={<DeleteReviewModal reviewId={review.id}/>}/>)}</li>
            ))}
        </ol></div>)
        reserveBar=(<div><i className="fa-solid fa-star"></i>{spot.avgStarRating} {spot.numReviews}reviews
     

        </div>)
    }
    

    return(
        <>
        <h1>
         {spot.name}
        </h1>
        <h2>{spot.city},{spot.state},{spot.country}</h2>
        <ol>
            {spot.SpotImages && spot.SpotImages.length > 0 && (spot.SpotImages).map((ele)=>(
                <li key={ele.id}>
                    <img src={ele.url} alt={spot.name}/>
                </li>
            ))}
        </ol>
        <div><p>${spot.price}</p><p>night</p><div>{reserveBar}<button>Reserve</button></div></div>
        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
        <p>{spot.description}</p>
        {reviewBar}
        </>
        
    )

}

export default SpotShow;