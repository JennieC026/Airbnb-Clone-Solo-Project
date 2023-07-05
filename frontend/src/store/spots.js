import { csrfFetch } from "./csrf";
const LOAD_SPOTS = 'spot/loadSpots';
const LOAD_SPOT = 'spot/loadSpot'

export const loadSpots = (spots) =>{
    return {
        type:LOAD_SPOTS,
        spots
    }
}
export const loadSpot = (spot) =>{
    return {
        type:LOAD_SPOTS,
        spot
    }
}

export const fetchSpots = () => async (dispatch) =>{
    const res = await csrfFetch('/api/spots');
    const data = await res.json();
    dispatch(loadSpots(data.Spots));
    return res;
}

export const fetchSpot = (id) => async (dispatch) =>{
    const res = await csrfFetch(`/api/spots/${id}`);
    const data = await res.json();
    dispatch(loadSpot(data));
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
            case LOAD_SPOT:
                return {...state,singleSpot:{...action.spot}}
        default:
            return state;
    }

}

export default spotReducer;