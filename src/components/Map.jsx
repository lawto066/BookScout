import { MapContainer, TileLayer } from 'react-leaflet'
import LibraryMarker from './LibraryMarker'

function Map() {
  return (
    <div id="map">
      <MapContainer center={[44.9778, -93.2650]} zoom={13} style={{ height: "100%", width: "100%" }} >

        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LibraryMarker />

      </MapContainer>
    </div>
  )
}

export default Map