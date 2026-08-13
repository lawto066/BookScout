import { Marker } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";

const libraryIcon = new L.Icon({
  iconUrl: "/library.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Show libraries without books with a faded icon.
const emptyLibraryIcon = new L.DivIcon({
  html: `<img src="/library.png" style="width:40px;height:40px;opacity:0.35;">`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  className: "custom-library-icon",
});

// Show a remove button on the library marker.
const removeLibraryIcon = (hasBooks) =>
  new L.DivIcon({
    html: `
        <div class="library-marker">
            <img src="/library.png" style="opacity: ${hasBooks ? 1 : 0.35};">
            <span class="remove-marker-x">×</span>
        </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    className: "custom-library-icon",
  });

function LibraryMarker({
  library,
  removeMode,
  setLibraryToRemove,
  selectedGenres,
  selectedQuery,
}) {
  const navigate = useNavigate();

  return (
    <Marker
      position={[library.latitude, library.longitude]}
      icon={
        removeMode
          ? removeLibraryIcon(library.has_books)
          : library.has_books
            ? libraryIcon
            : emptyLibraryIcon
      }
      library={library}
      eventHandlers={{
        click: () => {
          if (removeMode) {
            setLibraryToRemove(library);
          } else {
            // Open the library and keep the current search filters.
            navigate(`/library/${library.id}`, {
              state: { selectedGenres, selectedQuery },
            });
          }
        },
      }}
    ></Marker>
  );
}

export default LibraryMarker;
