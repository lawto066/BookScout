import Navbar from '../components/Navbar'
import Map from '../components/Map'
import AddLibraryForm from '../components/AddLibraryForm'
import RemoveLibraryConfirmation from '../components/RemoveLibraryConfirmation'

// import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function MapPage() {
    const [showAddLibrary, setShowAddLibrary] = useState(false);
    const [removeMode, setRemoveMode] = useState(false);
    const [libraryToRemove, setLibraryToRemove] = useState(null);

    const [refreshMap, setRefreshMap] = useState(false);

    return (
        <div>
            <Navbar />

            <Map refreshMap={refreshMap} removeMode={removeMode} setLibraryToRemove={setLibraryToRemove} />

            {showAddLibrary && <AddLibraryForm setShowAddLibrary={setShowAddLibrary} setRefreshMap={setRefreshMap} />}

            {libraryToRemove && (<RemoveLibraryConfirmation library={libraryToRemove} onClose={() => setLibraryToRemove(null)} refreshMap={setRefreshMap}/>)}

            <button id="add-library-button" onClick={() => setShowAddLibrary(true)}>
                Add Library
            </button>

            <button id="remove-library-button" onClick={() => setRemoveMode(!removeMode)}>
                {removeMode ? "Done" : "Remove Libraries"}
            </button>
        </div>
    )
}

export default MapPage