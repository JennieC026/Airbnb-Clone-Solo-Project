import { csrfFetch } from "./csrf";
const LOAD_SPOTS = 'spot/loadSpots';
const LOAD_SPOT = 'spot/loadSpot';
const RECEIVE_SPOT = 'spot/receiveSpot';
const UPDATE_SPOT = 'spot/updateSpot';
const REMOVE_SPOT = 'spot/removeSpot';


export const loadSpots = (spots) =>{
    return {
        type:LOAD_SPOTS,
        spots
    }
}
export const loadSpot = (spot) =>{
    return {
        type:LOAD_SPOT,
        spot
    }
}

export const receiveSpot = (spot) =>{
    return {
        type:RECEIVE_SPOT,
        spot
    }
}

export const updateSpot = (spot) =>{
    return {
        type:UPDATE_SPOT,
        spot
    }
}

export const removeSpot = (spotId) => {
    return{
        type:REMOVE_SPOT,
        spotId
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
export const fetchOwnedSpots = () => async (dispatch) =>{
    const res = await csrfFetch('/api/spots/current');
    const data = await res.json();
    dispatch(loadSpots(data.Spots));
    return res;

}

export const fetchCreateSpot = (spot,images,previewImage) => async(dispatch)=>{
    const resCreateSpot = await csrfFetch('/api/spots',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(spot)
    })
    const spotData =await resCreateSpot.json();
    const spotId = spotData.id;
    const previewImg = await csrfFetch(`/api/spots/${spotId}/images`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            url:previewImage,
            preview:true
        })
    })

    images.forEach(async(image,index)=>{
        await csrfFetch(`/api/spots/${spotId}/images`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                url:image,
                preview:false
            })
        })
    })
    
    const resDetailSpot = await csrfFetch(`/api/spots/${spotId}`);
    


    const data = await resDetailSpot.json();
    dispatch(receiveSpot(data))

    return data;

}

export const fetchEditSpot = (spot) => async(dispatch)=>{
    const resEdited = await csrfFetch(`/api/spots/${spot.id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(spot)
    });
    const resDetailSpot = await csrfFetch(`/api/spots/${spot.id}`);
    
    const data = await resDetailSpot.json();

    

    dispatch(updateSpot(data));
    return data;
}

export const fetchDeleteSpot = (spotId) => async (dispatch) =>{
    const res = await csrfFetch(`/api/spots/${spotId}`,{
        method:'DELETE'
    })
    const data = await res.json();
    dispatch(removeSpot(spotId));
    return data;
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
        case RECEIVE_SPOT:
                return {...state,singleSpot:{...action.spot}}
        case UPDATE_SPOT:
                return {...state,singleSpot:{...action.spot}}
        case REMOVE_SPOT:
                return{
                    ...state,
                    allSpots:state.allSpots.filter(spot=>spot.id !==action.spotId),
                    singleSpot:state.singleSpot.id === action.spotId?{}:state.singleSpot
                }
        default:
            return state;
    }

}

export default spotReducer;