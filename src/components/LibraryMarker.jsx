import { Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'

function LibraryMarker() {
  const navigate = useNavigate();

  return (
    <Marker position={[44.9778, -93.2650]} eventHandlers={{click: () => navigate('/library')}}>

      <Popup> Little Free Library </Popup>

    </Marker>
  )
}

export default LibraryMarker