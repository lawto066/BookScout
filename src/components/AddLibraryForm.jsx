import { useState } from "react";
import LocationAutocomplete from "../components/LocationAutocomplete"


function AddLibraryForm({ skipSearch, setShowAddLibrary, setRefreshMap }) {
  const [name, setName] = useState("");
  const [location_name, setLocation] = useState("");
  const [charterNumber, setCharterNumber] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState("");

  async function getLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      setLatitude(lat);
      setLongitude(lon);

      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await response.json();

      setLocation(data.display_name);
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

      <div id="library-name-input">
        <input type="text" placeholder="Library Name" value={name} onChange={(e) => setName(e.target.value)} />
        {name && <button type="button" id="clear-library-name" onClick={() => setName("")}>×</button>}
      </div>

      <div id="location-input-wrapper">
        <LocationAutocomplete location_name={location_name} setLocation={setLocation} setLatitude={setLatitude} setLongitude={setLongitude} />

        <button id="current-location-button" onClick={getLocation}>
          <img src="/location.svg" alt="" />
        </button>

      </div>

      <div id="charter-number-input">
        <input type="text" placeholder="Charter Number (optional)" value={charterNumber} onChange={(e) => setCharterNumber(e.target.value)} />
        {charterNumber && <button type="button" id="clear-charter-number" onClick={() => setCharterNumber("")}>×</button>}
      </div>

      {error && <p id="form-error">{error}</p>}

      <button id="save-library-button" onClick={addLibrary}>Save Library</button>
    </div>
  )
}

export default AddLibraryForm