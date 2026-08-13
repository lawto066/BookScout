import Navbar from "../components/Navbar";
import Map from "../components/Map";
import AddLibraryForm from "../components/AddLibraryForm";
import RemoveLibraryConfirmation from "../components/RemoveLibraryConfirmation";
import SearchBooks from "../components/SearchBooks";

import "./MapPage.css";

import { useState } from "react";

function MapPage() {
  const [showAddLibrary, setShowAddLibrary] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [libraryToRemove, setLibraryToRemove] = useState(null);

  const [refreshMap, setRefreshMap] = useState(false);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState("");

  return (
    <div className="map-page">
      <Navbar />

      {/* Search and filter options for the map. */}
      <SearchBooks
        setSelectedQuery={setSelectedQuery}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />

      {/* The map and its contents */}
      <Map
        refreshMap={refreshMap}
        removeMode={removeMode}
        setLibraryToRemove={setLibraryToRemove}
        selectedGenres={selectedGenres}
        selectedQuery={selectedQuery}
      />

      {/* Add and remove library forms. */}
      {showAddLibrary && (
        <AddLibraryForm
          setShowAddLibrary={setShowAddLibrary}
          setRefreshMap={setRefreshMap}
        />
      )}

      {libraryToRemove && (
        <RemoveLibraryConfirmation
          library={libraryToRemove}
          onClose={() => setLibraryToRemove(null)}
          refreshMap={setRefreshMap}
          setRemoveMode={setRemoveMode}
        />
      )}

      {/* Buttons for adding and removing libraries. */}
      <button id="add-library-button" onClick={() => setShowAddLibrary(true)}>
        Add Library
      </button>

      <button
        id="remove-library-button"
        onClick={() => setRemoveMode(!removeMode)}
      >
        {removeMode ? "Cancel" : "Remove Library"}
      </button>
    </div>
  );
}

export default MapPage;
