function AddLibraryForm({ setShowAddLibrary }) {

  return (
    <div id="add-library-form">

      <button id="close-add-library" onClick={() => setShowAddLibrary(false)}>✕</button>

      <h1>Add Library</h1>

      <input type="text" placeholder="Library Name"/>
      <input type="text" placeholder="Location"/>
      <button>Use Current Location</button>
      <input type="text" placeholder="Charter Number (optional)" />

      <button onClick={() => setShowAddLibrary(false)}>Save Library</button>
    </div>
  )
}

export default AddLibraryForm