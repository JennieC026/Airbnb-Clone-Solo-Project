import {useEffect}from'react';
import{useDispatch,useSelector}from'react-redux'
import { fetchSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import './SpotIndex.css'

function SpotIndex(){
    const dispatch = useDispatch();
    const spots = useSelector(state=>state.spots.allSpots);
    console.log('spot',spots)

    useEffect(()=>{
        dispatch(fetchSpots())
    },[dispatch]);

    return(
        <div>
            <h1>Spots</h1>
            <ol className='getAllSpots'>
                {spots.map((spot)=>(
                    <li key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`}>
                            <div>
                                <img src={spot.previewImage} alt={spot.name}/>
                                  <h3>{`${spot.city},${spot.state}`}</h3><div><i className="fa-solid fa-star"></i><p>{spot.avgRating}</p></div>
                                  <p>{`$${spot.price}`}</p>
                                  </div>
                                  </NavLink>
                                  </li>
               ) )}
            </ol>
        </div>
    )

}

export default SpotIndex;