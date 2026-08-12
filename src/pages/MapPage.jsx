import Navbar from '../components/Navbar'
import Map from '../components/Map'
import AddLibraryForm from '../components/AddLibraryForm'
import RemoveLibraryConfirmation from '../components/RemoveLibraryConfirmation'
import SearchBooks from '../components/SearchBooks'

import { useState } from 'react'

function MapPage() {
    const [showAddLibrary, setShowAddLibrary] = useState(false);
    const [removeMode, setRemoveMode] = useState(false);
    const [libraryToRemove, setLibraryToRemove] = useState(null);

    const [refreshMap, setRefreshMap] = useState(false);

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState("");

    return (
        <div>
            <Navbar />

            <SearchBooks setSelectedQuery={setSelectedQuery} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>

            <Map refreshMap={refreshMap} removeMode={removeMode} setLibraryToRemove={setLibraryToRemove} selectedGenres={selectedGenres} selectedQuery={selectedQuery} />

            {showAddLibrary && <AddLibraryForm setShowAddLibrary={setShowAddLibrary} setRefreshMap={setRefreshMap} />}

            {libraryToRemove && (<RemoveLibraryConfirmation library={libraryToRemove} onClose={() => setLibraryToRemove(null)} refreshMap={setRefreshMap} setRemoveMode={setRemoveMode}/>)}

            <button id="add-library-button" onClick={() => setShowAddLibrary(true)}>
                Add Library
            </button>

            <button id="remove-library-button" onClick={() => setRemoveMode(!removeMode)}>
                {removeMode ? "Cancel" : "Remove Library"}
            </button>
        </div>
    )
}

export default MapPage