import {useEffect}from'react';
import{useDispatch,useSelector}from'react-redux'
import { fetchDeleteSpot, fetchOwnedSpots } from '../../store/spots';
import { NavLink,useHistory } from 'react-router-dom/cjs/react-router-dom';
import DeleteSpotModal from '../DeleteSpotModal';
import OpenModalButton from "../OpenModalButton";

function OwnedSpots(){
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state=>state.spots.allSpots);
    

    useEffect(()=>{
        dispatch(fetchOwnedSpots())
    },[dispatch]);

    const handleUpdateClick = (spotId) =>{
        history.push(`/spots/${spotId}/edit`)
    }

   

    if(spots.length===0){
        return(<div><h2>Loading...</h2></div>)
    }
    return(<div>
     <div>
            <h1>Manage Your Spots</h1>
            <button>Create New Spot</button>
            <ol className='getAllSpots'>
                {spots.map((spot)=>(
                    <li key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`}>
                            <div>
                                <img src={spot.previewImage?spot.previewImage:'https://cdn.discordapp.com/attachments/811082976501825539/1126211321252286515/Untitled-1_copy.jpg'} alt={spot.name} className='all-spots-image'/>
                                  <h3>{`${spot.city},${spot.state}`}</h3><div><i className="fa-solid fa-star"></i><p>{spot.avgRating ? spot.avgRating : 'New' }</p></div>
                                  <p>{`$${spot.price}`}</p>
                                  </div>
                                  </NavLink>
                                  <button onClick={()=>handleUpdateClick(spot.id)}>Update</button> <OpenModalButton
        className='cursor-button'
          buttonText="Delete"
          modalComponent={<DeleteSpotModal spotId={spot.id}/>}
          
        />
                                  </li>
               ) )}
            </ol>
        </div>
    </div>)
}

export default OwnedSpots;