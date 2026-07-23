import Navbar from '../components/Navbar'
import Map from '../components/Map'
import AddLibraryForm from '../components/AddLibraryForm'

// import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function MapPage() {
    const [showAddLibrary, setShowAddLibrary] = useState(false);
    const [refreshMap, setRefreshMap] = useState(false);

    return (
        <div>
            <Navbar />

            <Map refreshMap={refreshMap} />

            {showAddLibrary && <AddLibraryForm setShowAddLibrary={setShowAddLibrary} setRefreshMap={setRefreshMap} />}

            <button id="add-library-button" onClick={() => setShowAddLibrary(true)}>
                Add Library
            </button>
        </div>
    )
}

export default MapPage