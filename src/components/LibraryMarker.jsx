import { Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'

function LibraryMarker({ library }) {
  const navigate = useNavigate();

  return (
    <Marker position={[library.latitude, library.longitude]} eventHandlers={{click: () => navigate('/library', { state: library })}}>

      <Popup> Little Free Library </Popup>

    </Marker>
  )
}

export default LibraryMarker