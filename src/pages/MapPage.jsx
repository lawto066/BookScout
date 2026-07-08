import Navbar from '../components/Navbar'
import Map from '../components/Map'
import AddLibraryForm from '../components/AddLibraryForm'

// import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function MapPage() {
    // const navigate = useNavigate();

    const [showAddLibrary, setShowAddLibrary] = useState(false);

    return (
        <div>
            <Navbar />

            <Map />

            {showAddLibrary && <AddLibraryForm setShowAddLibrary={setShowAddLibrary} />}

            <button id="add-library-button" onClick={() => setShowAddLibrary(true)}>
                Add Library
            </button>
        </div>
    )
}

export default MapPage