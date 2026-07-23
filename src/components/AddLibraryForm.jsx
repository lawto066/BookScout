import { useState } from "react";
import LocationAutocomplete from "../components/LocationAutocomplete"


function AddLibraryForm({ setShowAddLibrary, setRefreshMap }) {
  const [name, setName] = useState("");
  const [location_name, setLocation] = useState("");
  const [charterNumber, setCharterNumber] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState("");

  function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }

  async function addLibrary() {

    if (!name.trim()) {
      setError("Library name is required.");
      return;
    }

    if (!location_name.trim() && (latitude === null || longitude === null)) {
      setError("Location is required.");
      return;
    }

    setError("");

    await fetch("/api/libraries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        location_name,
        charter_number: charterNumber,
        latitude: latitude,
        longitude: longitude
      }),
    });

    setRefreshMap(prev => !prev);

    setShowAddLibrary(false);
  }
  

  return (
    <div id="add-library-form">

      <button id="close-add-library" onClick={() => setShowAddLibrary(false)}>✕</button>

      <h1>Add Library</h1>

      <input type="text" placeholder="Library Name" value={name} onChange={(e) => setName(e.target.value)}/>

      <LocationAutocomplete location_name={location_name} setLocation={setLocation} setLatitude={setLatitude} setLongitude={setLongitude} />
      <button onClick={getLocation}>Use Current Location</button>

      <input type="text" placeholder="Charter Number (optional)" value={charterNumber} onChange={(e) => setCharterNumber(e.target.value)}/>

      {error && <p id="form-error">{error}</p>}

      <button onClick={addLibrary}>Save Library</button>
    </div>
  )
}

export default AddLibraryForm