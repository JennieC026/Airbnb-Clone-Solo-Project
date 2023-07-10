import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchCreateSpot, fetchEditSpot } from "../../store/spots";
import './SpotForm.css'
function SpotForm({spot,formType}){
    const dispatch = useDispatch();
    const history = useHistory();
     const [country,setCountry] = useState(spot.country ? spot.country : '');
     const [address,setAddress] = useState(spot.address ? spot.address : '');
     const [city,setCity] = useState(spot.city ? spot.city : '');
     const [state,setState] = useState(spot.state ? spot.state : '');
     const [lat,setLat] = useState(spot.lat ? spot.lat : 0);
     const [lng,setLng] = useState(spot.lng ? spot.lng : 0);
     const [description,setDescription] = useState(spot.description ? spot.description : '');
     const [name,setName] = useState(spot.name ? spot.name : '');
     const [price,setPrice] = useState(spot.price ? spot.price : 0);
     const [images,setImages] = useState(Array(4).fill(''));
     const [previewImage,setPreviewImage] = useState('');
     const [errors,setErrors] = useState({});

    useEffect(()=>{
        let errors = {};


        if (country.length===0) {
            errors.country = 'Country is required';
        }

        if (address.length === 0) {
            errors.address = 'Street address is required';
        }
        
        if (city.length === 0) {
            errors.city = 'City is required';
        }
        
        if (state.length === 0) {
            errors.state = 'State is required';
        }

        if (Math.abs(lat) > 90) {
            errors.lat = 'Latitude is not valid';
        }
        
        if (Math.abs(lng) > 180) {
            errors.lng = 'Longitude is not valid';
        }

        if (name.length === 0 || name.length > 50) {
            errors.name = 'Name must be less than 50 characters';
        }
        
        if (description.length === 0) {
            errors.description = 'Description is required';
        }
        
        if (price.length === 0||price<=0) {
            errors.price = 'Price per day is required';
        }


        setErrors(errors);
    },[country, address, city, state, lat, lng, name, description, price])

     const handleSubmit = async(e) =>{
        e.preventDefault();
        setErrors({});
        let newSpot;
        spot = {...spot,country,address,city,state,lat,lng,description,price,name};
        if(formType==='Create Spot'){
             newSpot = await dispatch(fetchCreateSpot(spot,images,previewImage));
            
        }else if (formType==='Update Spot'){
            newSpot = await dispatch(fetchEditSpot(spot))
        }

        if(spot.errors){
            setErrors(spot.errors)
        }else{
            history.push(`/spots/${newSpot.id}`)
        }
            
        

        
     }

     const handleImageChange = (index,value)=>{
        const imageArr = [...images];
        imageArr[index]=value;
        setImages(imageArr);
     }
     let imageBar;
     if(formType==="Create Spot"){
        imageBar = (<div>

            <div><input type='text' placeholder='Preview Image URL'value ={previewImage} onChange ={e =>setPreviewImage(e.target.value) }/></div>

            {images.map((image,index)=>(
            <label key = {index}>
        <input type='text' placeholder="Image URL" value={image} onChange={e => handleImageChange(index,e.target.value)}/>
        </label>
    
))}


            </div>)
     }

     
    



    return (
        <>
        <h1>{formType==='Update Spot'?'Update a spot':'Create a new spot'}</h1>
        <h2>Where's your place located?</h2>
        <p>Guest will only get your exact address once they booked a reservation.</p>
        <form onSubmit={handleSubmit}>
            <label>
                Country
                <input type='text' value={country} onChange={e=>setCountry(e.target.value)} />
                {errors.country && <div className="errors">{errors.country}</div>}
            </label>
            <label>
                Street Address
                <input type='text' value={address} onChange={e=>setAddress(e.target.value)} />
                {errors.address && <div className="errors">{errors.address}</div>}
            </label>
            <label>
                City
                <input type='text' value={city} onChange={e=>setCity(e.target.value)} />
                {errors.city && <div className="errors">{errors.city}</div>}
            </label>
            <label>
                State
                <input type='text' value={state} onChange={e=>setState(e.target.value)} />
                {errors.state && <div className="errors">{errors.state}</div>}
            </label>
            <label>
                Latitude
                <input type='text' value={lat} onChange={e=>setLat(e.target.value)} />
                {errors.lat && <div className="errors">{errors.lat}</div>}
            </label>
            <label>
                Longitude
                <input type='text' value={lng} onChange={e=>setLng(e.target.value)} />
                {errors.lng && <div className="errors">{errors.lng}</div>}
            </label>

            <hr />


            <label>
                <h2>Describe Your Place to Guests</h2>
                <p>Mention the best features of your space, any special amentities like
fast wif or parking, and what you love about the neighborhood.</p>
                <textarea type='text' value={description} onChange={e=>setDescription(e.target.value)} />
                {errors.description && <div className="errors">{errors.description}</div>}
            </label>

            <hr />

            <label>
            <h2>Create a title for your spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes
your place special.</p>
                <input type='text' value={name} onChange={e=>setName(e.target.value)} />
                {errors.name && <div className="errors">{errors.name}</div>}
            </label>

            <hr />

            <label>
            <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher
in search results.</p>
             <i className="fa-regular fa-dollar-sign"></i>
                <input type='text' value={price} onChange={e=>setPrice(Number(e.target.value))} />
                {errors.price && <div className="errors">{errors.price}</div>}
            </label>

            <hr />
            {imageBar}
            

            

             <button type="submit" disabled={!!Object.keys(errors).length} >{formType==='Update Spot'?'Update a spot':'Create a new spot'}</button>
            


        </form>

        </>
    )
}


export default SpotForm;