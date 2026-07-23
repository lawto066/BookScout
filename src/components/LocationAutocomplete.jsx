import { useState, useEffect } from "react";

function LocationAutocomplete({ location_name, setLocation, setLatitude, setLongitude }) {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (location_name.length < 3) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(() => {
            fetch(`/api/location?q=${encodeURIComponent(location_name)}`)
                .then((response) => response.json())
                .then((data) => setSuggestions(data))
                .catch((error) => console.error(error));
        }, 1000);

        return () => clearTimeout(timer);

    }, [location_name]);

    return (
        <div id="location-container">
            <input type="text" placeholder="Address" value={location_name} onChange={(e) => setLocation(e.target.value)} />

            {suggestions.length > 0 && (
                <div id="location-suggestions">
                    {suggestions.map((place) => (
                        <div key={place.place_id} onClick={() => { setLocation(place.display_name); setLatitude(place.lat); setLongitude(place.lon); setSuggestions([]); }}>
                            {place.display_name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LocationAutocomplete;