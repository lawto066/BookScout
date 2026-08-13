function RemoveLibraryConfirmation({ library, onClose, refreshMap, setRemoveMode }) {

  async function removeLibrary() {
    // Delete the library and its books, refresh the map, and exit remove mode.
    await fetch(`/api/libraries/${library.id}`, {
      method: "DELETE",
    });

    refreshMap(prev => !prev);
    setRemoveMode(false);
    onClose();
  }

  return (
    <div id="modal-overlay">
      <div id="remove-library-confirmation">

        <h2>{library.name}</h2>

        <p>Remove this library and all books inside it?</p>

        <button onClick={onClose}> Cancel </button>

        <button onClick={removeLibrary}> Remove Library </button>

      </div>
    </div>
  )
}

export default RemoveLibraryConfirmation