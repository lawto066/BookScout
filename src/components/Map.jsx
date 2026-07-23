import { MapContainer, TileLayer } from 'react-leaflet'
import LibraryMarker from './LibraryMarker'
import { useEffect, useState } from 'react'

function Map({ refreshMap }) {
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    fetch("/api/libraries")
      .then(response => response.json())
      .then(data => setLibraries(data))
      .catch(error => console.error(error));
  }, [refreshMap]);

  return (
    <div id="map">
      <MapContainer center={[44.9778, -93.2650]} zoom={13} style={{ height: "100%", width: "100%" }} >

<TileLayer
  attribution='&copy; OpenStreetMap contributors &copy; CARTO'
  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
/>

        {libraries.map((library) => (
          <LibraryMarker key={library.id} library={library} />
        ))}

      </MapContainer>
    </div>
  )
}

export default Map