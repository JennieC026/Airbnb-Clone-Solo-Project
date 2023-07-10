import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchSpot } from '../../store/spots';
import SpotForm from './SpotForm';

function EditSpotForm(){
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state=>state.spots.singleSpot?state.spots.singleSpot:null);
    useEffect(()=>{
        dispatch(fetchSpot(spotId))
    },[dispatch,spotId])

    if(Object.keys(spot).length===0){
        return(<div><h1>Loading...</h1></div>)
    }
    
    return (
        <div>
            <SpotForm spot={spot} formType='Update Spot'/>
    
        </div>
        
    
    )
}


export default EditSpotForm;