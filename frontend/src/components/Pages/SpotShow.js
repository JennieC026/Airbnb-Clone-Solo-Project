import {useEffect}from'react';
import{useDispatch,useSelector}from'react-redux'
import { fetchSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';

function SpotShow(){
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state=>state.spots.singleSpots);

    useEffect(()=>{
        dispatch(fetchSpot(spotId))
    },[dispatch,spotId]);

    return(
        <div>
         {spot.name}
        </div>
    )

}

export default SpotShow;