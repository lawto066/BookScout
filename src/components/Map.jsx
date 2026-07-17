import { MapContainer, TileLayer } from 'react-leaflet'
import LibraryMarker from './LibraryMarker'

import { useEffect, useState } from 'react'

function Map() {
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/libraries")
      .then(response => response.json())
      .then(data => setLibraries(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div id="map">
      <MapContainer center={[44.9778, -93.2650]} zoom={13} style={{ height: "100%", width: "100%" }} >

        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {libraries.map((library) => (
          <LibraryMarker key={library.id} library={library} />
        ))}

      </MapContainer>
    </div>
  )
}

export default Map