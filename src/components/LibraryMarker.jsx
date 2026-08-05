import { Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import L from "leaflet";
import { useState } from "react";
import RemoveLibraryConfirmation from "./RemoveLibraryConfirmation";

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

function LibraryMarker({ library, removeMode, setLibraryToRemove }) {
  const navigate = useNavigate();

  return (
    <Marker 
      position={[library.latitude, library.longitude]} 
      icon={removeMode ? removeLibraryIcon : libraryIcon} 
      eventHandlers={{click: () => { 
        if (removeMode) { 
          setLibraryToRemove(library) 
        } else { 
          navigate('/library', { state: library })
        }
      }}}
    >

    </Marker>
  )
}

export default LibraryMarker