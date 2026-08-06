import { Marker } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import L from "leaflet";

const libraryIcon = new L.Icon({
  iconUrl: "/library.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const removeLibraryIcon = new L.DivIcon({
  html: `
    <div class="library-marker">
      <img src="/library.png">
      <span class="remove-marker-x">×</span>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  className: "custom-library-icon",
});

function LibraryMarker({ library, removeMode, setLibraryToRemove, selectedGenres  }) {
  const navigate = useNavigate();

  return (
    <Marker 
      position={[library.latitude, library.longitude]} 
      icon={removeMode ? removeLibraryIcon : libraryIcon} 
      eventHandlers={{click: () => { 
        if (removeMode) { 
          setLibraryToRemove(library) 
        } else { 
          navigate('/library', { state: { library, selectedGenres } })
        }
      }}}
    >

    </Marker>
  )
}

export default LibraryMarker