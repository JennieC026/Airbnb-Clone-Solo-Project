import {useEffect}from'react';
import{useDispatch,useSelector}from'react-redux'
import { fetchDeleteSpot, fetchOwnedSpots } from '../../store/spots';
import { NavLink,useHistory } from 'react-router-dom/cjs/react-router-dom';
import DeleteSpotModal from '../DeleteSpotModal';
import OpenModalButton from "../OpenModalButton";

function OwnedSpots(){
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state=>state.spots.allSpots||null);
    

    useEffect(()=>{
        dispatch(fetchOwnedSpots())
    },[dispatch]);

    const handleUpdateClick = (spotId) =>{
        history.push(`/spots/${spotId}/edit`)
    }
    const handleCreateNewSpotClick = () =>{
        history.push('/spots/new')
    }

    if(spots===null){
        return(<div><h2>Loading...</h2></div>)
    }

    if(spots.length===0){
        return(<div><h2><NavLink to='/spots/new'>Create New Spot</NavLink></h2></div>)
    }

    
    return(<div>
     <div>
            <h1>Manage Your Spots</h1>
            <button onClick={handleCreateNewSpotClick}>Create New Spot</button>
            <ol className='getAllSpots'>
                {spots.map((spot)=>(
                    <li key={spot.id} className='all-spot-list'>
                        <NavLink to={`/spots/${spot.id}`} title={spot.name}>
                            <div>
                                <div className='square-container'>
                                <img src={spot.previewImage?spot.previewImage:'https://cdn.discordapp.com/attachments/811082976501825539/1126211321252286515/Untitled-1_copy.jpg'} alt={spot.name} className='all-spots-image'/>
                                </div>
                                <div className='info-block'>
                                    <div className='first-row'>
                                    <p className='all-spot-text'>{`${spot.city},${spot.state}`}</p><div id='avg-review-bar'><i className="fa-solid fa-star"></i><p className='all-spot-text'>{spot.avgStarRating ? spot.avgStarRating : 'New' }</p></div>
                                    </div>
                                    <div className='second-row'>
                                    <p className='all-spot-text'>{`$${spot.price}`} night</p>
                                    </div>
                                    
                                    </div>
                                  
                                  
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