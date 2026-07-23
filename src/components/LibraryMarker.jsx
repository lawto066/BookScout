import { Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import L from "leaflet";

const libraryIcon = new L.Icon({
  iconUrl: "/library.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function LibraryMarker({ library }) {
  const navigate = useNavigate();

  return (
    <Marker position={[library.latitude, library.longitude]} icon={libraryIcon} eventHandlers={{click: () => navigate('/library', { state: library })}}>

      <Popup> Little Free Library </Popup>

    </Marker>
  )
}

export default LibraryMarker