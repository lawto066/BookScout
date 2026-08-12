import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import LibraryMarker from './LibraryMarker'
import { useEffect, useState } from 'react'


function Map({ refreshMap, removeMode, setLibraryToRemove, selectedGenres, selectedQuery }) {
  const [libraries, setLibraries] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    let url = "/api/libraries";
    let params = [];

    if (selectedGenres.length > 0) {
      params.push(`genres=${selectedGenres.join(",")}`);
    }

    if (selectedQuery.length > 0) {
      params.push(`query=${selectedQuery}`);
    }

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setLibraries(data))
      .catch(error => console.error(error));

  }, [refreshMap, selectedGenres, selectedQuery]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( 
      (position) => { setMapCenter([position.coords.latitude, position.coords.longitude]);},
      () => {setMapCenter([44.9778, -93.2650]);} );
  }, []);

  const clusterIcon = (cluster) => {
      const hasBooks = cluster.getAllChildMarkers().some(
          marker => marker.options.library?.has_books
      );

      return new L.DivIcon({
          html: `
              <div class="cluster-icon" style="opacity: ${hasBooks ? 1 : 0.35};">
                  <img src="/library.png">
                  <span>${cluster.getChildCount()}</span>
              </div>
          `,
          iconSize: [40, 40],
          className: "custom-cluster-icon",
      });
  };

  if (!mapCenter) {
    return null;
  }

  return (
    <div id="map">
      <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }} zoomControl={false} >

        <TileLayer attribution='&copy; OpenStreetMap contributors &copy; CARTO' url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"/>

        <MarkerClusterGroup maxClusterRadius={180} iconCreateFunction={clusterIcon}>
          {libraries.map((library) => (
            <LibraryMarker key={library.id} library={library} removeMode={removeMode} setLibraryToRemove={setLibraryToRemove} selectedGenres={selectedGenres} selectedQuery={selectedQuery} />
          ))}
        </MarkerClusterGroup>

        <ZoomControl position="topright" />

      </MapContainer>
    </div>
  )
}

export default Map