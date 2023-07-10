import {useEffect}from'react';
import{useDispatch,useSelector}from'react-redux'
import { fetchSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { fetchSpotReviews } from '../../store/review';
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from '../CreateReviewModal';
import DeleteReviewModal from '../DeleteReviewModal';
import UpdateReviewModal from '../UpdateReview';
import './SpotShow.css'

function SpotShow(){
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state=>state.spots.singleSpot?state.spots.singleSpot:null);
    const sessionUser = useSelector((state) => state.session.user);
    const reviews = useSelector(state=>state.reviews.spot?state.reviews.spot:[]);
    const currentUserID = useSelector(state => state.session.user?.id);




    
   
    

    useEffect(()=>{
        dispatch(fetchSpot(spotId))
    },[dispatch,spotId]);

    useEffect(()=>{
        dispatch(fetchSpotReviews(spotId))
    },[dispatch,spotId]);

    const handleReserveClick = () =>{
        alert('Feature coming soon')
    }
    let userHasReview = false;
    if(reviews.find(review=>review.User?.id===currentUserID)){
        userHasReview = true;
    }
    let userOwnsSpot = false;
    if(spot.Owner?.id===currentUserID){
        userOwnsSpot = true;
    }


    if(Object.keys(spot).length===0){
        return(
            <div>Loading...</div>
        )
    }
    let reviewBar;
    let reserveBar;
    if(reviews.length===0){
        reviewBar=(<div> <i className="fa-solid fa-star"></i>New  {!userHasReview &&sessionUser&&!userOwnsSpot&& <OpenModalButton
            className='cursor-button'
              buttonText="Be the first to post a
              review!"
              modalComponent={<CreateReviewModal spotId={spot.id} formType={'Create Review'}/>}/>}
</div>
        );
        reserveBar=(<div className='reserve-bar'><i className="fa-solid fa-star"></i>New</div>)

    }else{

        reviewBar = (<div><div className='star-rate'><div><i className="fa-solid fa-star"></i>{spot.avgStarRating}</div><h2>·</h2><h2>{spot.numReviews}{spot.numReviews===1? 'Review' : 'Reviews'}</h2></div>
         {!userHasReview &&sessionUser&&!userOwnsSpot&& <OpenModalButton
        className='cursor-button'
          buttonText="Post Your Review"
          modalComponent={<CreateReviewModal spotId={spot.id} formType={'Create Review'}/>}/>}

        
        <ol>
            {reviews.length > 0 && [...reviews].reverse().map((review)=>(
                <li key={review?.id}><h3>{review.User?.firstName}</h3><p>{new Date(review.updatedAt).toLocaleDateString('en-US',{year:'numeric',month:'long'})}</p><p>{review.review}</p>
                {review?.User.id === currentUserID && (<div><OpenModalButton
                    className='cursor-button'
                      buttonText="Delete"
                      modalComponent={<DeleteReviewModal reviewId={review.id}/>}/>
                      <OpenModalButton
                    className='cursor-button'
                      buttonText="Update"
                      modalComponent={<UpdateReviewModal originReview={review}/>}/></div>
                    )}</li>
            ))}
        </ol></div>)
        reserveBar=(<div ><i className="fa-solid fa-star"></i>{spot.avgStarRating} {spot.numReviews}{spot.numReviews===1? 'review' : 'reviews'}
     

        </div>)
    }
    

    return(
        <>
        <h1>
         {spot.name}
        </h1>
        <h2>{spot.city},{spot.state},{spot.country}</h2>
        <ol className='spot-detail-images'>
        <div className='image-container'>
            {spot.SpotImages && spot.SpotImages.length > 0 && (spot.SpotImages).map((ele)=>(
                
                    <li key={ele.id}>
                    <img src={ele.url} alt={spot.name}/>
                </li>

                
                
            ))}
            </div>
        </ol>
        <div className='des-bar-all'><div className='des-bar'><h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
        <p>{spot.description}</p></div>
        <div className='reserve-bar'><div className='r-child'><p>${spot.price}per night</p>{reserveBar}</div><div className='r-button' ><button className='reserve' onClick={handleReserveClick}>Reserve</button></div></div></div>
        
        
        {reviewBar}
        </>
        
    )

}

export default SpotShow;