import{csrfFetch}from './csrf';
const LOAD_SPOT_REVIEWS = 'review/loadSpotReviews';
const LOAD_USER_REVIEWS = 'review/loadUserReviews';
const CREATE_REVIEW = 'review/createReview';
const REMOVE_REVIEW = 'review/removeReview';


export const loadSpotReviews = (reviews) =>{
    return {
        type:LOAD_SPOT_REVIEWS,
        reviews
    }
}

export const loadUserReviews = (reviews) =>{
    return {
        type:LOAD_USER_REVIEWS,
        reviews
    }
}

export const createReview = (review) =>{
    return {
        type:CREATE_REVIEW,
        review
    }
}

export const removeReview = (reviewId)=>{
    return{
        type:REMOVE_REVIEW,
        reviewId
    }
}

export const fetchSpotReviews = (spotId) => async (dispatch) =>{
    const res =await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await res.json();
    dispatch(loadSpotReviews(data.Reviews));
    return res;
}

export const fetchUserReviews = () => async (dispatch) =>{
    const res =await csrfFetch(`/api/reviews/current`);
    const data = await res.json();
    dispatch(loadUserReviews(data.Reviews));
    return res;
}

export const fetchCreateReviews = (spotId,review) =>async (dispatch) =>{
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(review)
    });
    if(!(res.ok)){
        const data = await res.json();
        console.log(data)
        throw data;
    }
    const data = await res.json();
    const resReview = await csrfFetch(`/api/spots/${spotId}/reviews`);
   
    const reviewData = await resReview.json();
    const detailedReviewData = reviewData.Reviews.find(review=>review.id===data.id)

    dispatch(createReview(detailedReviewData));

    return data;
}

export const fetchDeleteReview = (reviewId) =>async(dispatch)=>{
    const res = await csrfFetch(`/api/reviews/${reviewId}`,{
        method:'DELETE'
    })
    const data = await res.json();
    dispatch(removeReview(reviewId));
    return res;

}

const initialState = {
    spot:[],
    user:[]
}

const reviewReducer = (state = initialState,action)=>{
    switch(action.type){
        case LOAD_SPOT_REVIEWS:
            return {...state,spot:[...action.reviews]};
        case LOAD_USER_REVIEWS:
            return {...state,user:[...action.reviews]};
        case CREATE_REVIEW:
            return {...state,spot:[...state.spot, action.review],user:[...state.user, action.review]};
        case REMOVE_REVIEW:
            return {
                ...state,
                spot:state.spot.filter(review=>review.id!==action.reviewId),
                user:state.user.filter(review=>review.id!==action.reviewId)
            }
        default:
            return state;
    }

}


export default reviewReducer;