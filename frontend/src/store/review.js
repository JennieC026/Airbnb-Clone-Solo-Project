import{csrfFetch}from './csrf';
const LOAD_SPOT_REVIEWS = 'review/loadSpotReviews';
const LOAD_USER_REVIEWS = 'review/loadUserReviews';

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

export const fetchSpotReviews = (spotId) => async (dispatch) =>{
    const res =await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await res.json();
    console.log('data',data)
    dispatch(loadSpotReviews(data.Reviews));
    return res;
}

export const fetchUserReviews = () => async (dispatch) =>{
    const res =await csrfFetch(`/api/reviews/current`);
    const data = await res.json();
    dispatch(loadUserReviews(data.Reviews));
    return res;
}

const initialState = {
    spot:[],
    user:[]
}

const reviewReducer = (state = initialState,action)=>{
    switch(action.type){
        case LOAD_SPOT_REVIEWS:
            return {...state,spot:[...action.reviews]}
        case LOAD_USER_REVIEWS:
            return {...state,user:[...action.reviews]}
        default:
            return state;
    }

}


export default reviewReducer;