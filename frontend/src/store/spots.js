import { csrfFetch } from "./csrf";
const LOAD_SPOTS = 'spot/loadSpots';

export const loadSpots = (spots) =>{
    return {
        type:LOAD_SPOTS,
        spots
    }
}

export const fetchSpots = () => async (dispatch) =>{
    const res = await csrfFetch('/api/spots');
    const data = await res.json();
    console.log('data',data)
    dispatch(loadSpots(data.Spots));
    return res;


}
const initialState = {
    allSpots:[],
    singleSpot:{}
}

const spotReducer = (state = initialState,action)=>{
    switch(action.type){
        case LOAD_SPOTS:
            return {...state,allSpots:[...action.spots]}
        default:
            return state;
    }

}

export default spotReducer;