import {useEffect}from'react';
import{useDispatch,useSelector}from'react-redux'
import { fetchSpots } from '../../store/spots';

function SpotShow(){
    const dispatch = useDispatch();
    const spots = useSelector(state=>state.spots.allSpots);

}