import { MapContainer, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import { useMap } from "react-leaflet";
import L from "leaflet";
import LibraryMarker from './LibraryMarker'
import { useEffect, useState } from 'react'


function Map({ refreshMap }) {
  const [libraries, setLibraries] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    fetch("/api/libraries").then(response => response.json()).then(data => setLibraries(data)).catch(error => console.error(error));
  }, [refreshMap]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( (position) => { setMapCenter([position.coords.latitude, position.coords.longitude]);}, () => {setMapCenter([44.9778, -93.2650]);} );
  }, []);

  const clusterIcon = (cluster) => new L.DivIcon({
    html: `
      <div class="cluster-icon">
        <img src="/library.png">
        <span>${cluster.getChildCount()}</span>
      </div>
    `,
    iconSize: [40, 40],
    className: "custom-cluster-icon",
  });

  if (!mapCenter) {
    return null;
  }

  return (
    <div id="map">
      <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }} >

      <TileLayer attribution='&copy; OpenStreetMap contributors &copy; CARTO' url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"/>

      <MarkerClusterGroup iconCreateFunction={clusterIcon}>
        {libraries.map((library) => (
          <LibraryMarker key={library.id} library={library} />
        ))}
      </MarkerClusterGroup>

      </MapContainer>
    </div>
  )
}

export default Map