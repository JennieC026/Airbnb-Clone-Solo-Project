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
                                    <p className='all-spot-text'>{`${spot.city},${spot.state}`}</p><div id='avg-review-bar'><i className="fa-solid fa-star"></i><p className='all-spot-text'>{spot.avgRating ? spot.avgRating : 'New' }</p></div>
                                    </div>
                                    <div className='second-row'>
                                    <p className='all-spot-text'>{`$${spot.price}`} night</p>
                                    </div>
                                    
                                    </div>
                                  
                                  
                                  </div>
                                  </NavLink>
                                  </li>
               ) )}
            </ol>
        </div>
    )

}

export default SpotIndex;