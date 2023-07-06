import {useEffect}from'react';
import{useDispatch,useSelector}from'react-redux'
import { fetchSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { fetchSpotReviews } from '../../store/review';

function SpotShow(){
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state=>state.spots.singleSpot?state.spots.singleSpot:null);
    const reviews = useSelector(state=>state.reviews.spot?state.reviews.spot:null);
    console.log('spotId',spotId)
    console.log('spot',spot)
   
    

    useEffect(()=>{
        dispatch(fetchSpot(spotId))
    },[dispatch,spotId]);

    useEffect(()=>{
        dispatch(fetchSpotReviews(spotId))
    },[dispatch,spotId]);


    if(Object.keys(spot).length===0&&reviews.length===0){
        return(
            <div>Loading...</div>
        )
    }

    return(
        <>
        <h1>
         {spot.name}
        </h1>
        <h2>{spot.city},{spot.state},{spot.country}</h2>
        <ol>
            {(spot.SpotImages).map((ele)=>(
                <li key={ele.id}>
                    <img src={ele.url}/>
                </li>
            ))}
        </ol>
        <div><p>${spot.price}</p><p>night</p><div><i className="fa-solid fa-star"></i>{spot.avgStarRating}reviews</div></div>
        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
        <p>{spot.description}</p>
        <div><i className="fa-solid fa-star"></i>{spot.avgStarRating}</div>
        <h2>Reviews</h2>
        <ol>
            {reviews.map((review)=>(
                <li key={review.id}><h3>{review.User.firstName}</h3><p>{review.updatedAt}</p><p>{review.review}</p></li>
            ))}
        </ol>

        </>
        
    )

}

export default SpotShow;