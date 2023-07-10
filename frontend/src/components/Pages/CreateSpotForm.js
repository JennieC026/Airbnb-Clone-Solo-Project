import SpotForm from "./SpotForm";

function CreateSpotForm(){
    const spot = {};
    return(
        <SpotForm
      spot={spot}
      formType="Create Spot"
    />
    )

}

export default CreateSpotForm;