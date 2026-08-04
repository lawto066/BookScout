import { useState, useEffect } from "react";

function LocationAutocomplete({ location_name, setLocation, setLatitude, setLongitude }) {
    const [suggestions, setSuggestions] = useState([]);
    const [skipSearch, setSkipSearch] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (skipSearch) return;

        const timer = setTimeout(() => {
            fetch(`/api/location?q=${encodeURIComponent(location_name)}`)
                .then((response) => response.json())
                .then((data) => { setSuggestions(data.slice(0, 5)); setHasSearched(true); })
                .catch((error) => console.error(error));
        }, 1000);

        return () => clearTimeout(timer);

    }, [location_name, skipSearch]);

    return (
        <div id="location-container">
            <input type="text" placeholder="Address" value={location_name} onChange={(e) => { setSkipSearch(false); setLocation(e.target.value); setSuggestions([]); setHasSearched(false);}} />

            {location_name.length >= 3 && !skipSearch && (
                <div id="location-suggestions">
                    {hasSearched && suggestions.length === 0 && <div>No results found</div>}

                    {suggestions.map((place) => (
                        <div key={place.place_id} onClick={() => { setSkipSearch(true); setLocation(place.display_name); setLatitude(place.lat); setLongitude(place.lon); setSuggestions([]); }}>
                            {place.display_name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LocationAutocomplete;