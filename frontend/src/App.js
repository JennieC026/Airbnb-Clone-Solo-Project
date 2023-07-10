import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch,Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/Pages/SpotIndex";
import SpotShow from "./components/Pages/SpotShow";
import CreateSpotForm from "./components/Pages/CreateSpotForm";
import EditSpotForm from "./components/Pages/EditSpotForm";
import OwnedSpots from "./components/Pages/OwnedSpots";
import OwnedReviews from "./components/Pages/OwnedReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded? <Switch>
        <Route exact path = '/'>
          <SpotIndex />
        </Route>
        <Route exact path = '/spots'>
          <SpotIndex />
        </Route>
        <Route exact path = '/spots/new'>
          <CreateSpotForm />
        </Route>
        <Route  path = '/spots/current'>
          <OwnedSpots />
        </Route>
        <Route exact path = '/spots/:spotId/edit'>
          <EditSpotForm />
        </Route>
        <Route exact path = '/spots/:spotId'>
          <SpotShow />
        </Route>
        <Route path = '/reviews/current'>
          <OwnedReviews />
        </Route>
       
      </Switch>:<h2>Loading..</h2>}
    </>
  );
}

export default App;