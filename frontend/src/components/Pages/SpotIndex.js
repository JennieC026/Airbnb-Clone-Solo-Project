import {useEffect}from'react';
import{useDispatch,useSelector}from'react-redux'
import { fetchSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import './SpotIndex.css'

function SpotIndex(){
    const dispatch = useDispatch();
    const spots = useSelector(state=>state.spots.allSpots);
    

    useEffect(()=>{
        dispatch(fetchSpots())
    },[dispatch]);

if(spots.length===0){
    return(<div><h2>Loading...</h2></div>)
}

    return(
        <div>
            <h1>Spots</h1>
            <ol className='getAllSpots'>
                {spots.map((spot)=>(
                    <li key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`} title={spot.name}>
                            <div>
                                <img src={spot.previewImage?spot.previewImage:'https://cdn.discordapp.com/attachments/811082976501825539/1126211321252286515/Untitled-1_copy.jpg'} alt={spot.name} className='all-spots-image'/>
                                  <h3>{`${spot.city},${spot.state}`}</h3><div><i className="fa-solid fa-star"></i><p>{spot.avgRating ? spot.avgRating : 'New' }</p></div>
                                  <p>{`$${spot.price}`}night</p>
                                  </div>
                                  </NavLink>
                                  </li>
               ) )}
            </ol>
        </div>
    )

}

export default SpotIndex;