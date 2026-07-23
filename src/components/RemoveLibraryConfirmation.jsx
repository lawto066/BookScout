function RemoveLibraryConfirmation({ library, onClose, navigate }) {

  async function removeLibrary() {
    await fetch(`/api/libraries/${library.id}`, {
      method: "DELETE",
    });

    navigate("/");
  }

  return (
    <div id="modal-overlay">
      <div id="add-book-confirmation">

        <h2>{library.name}</h2>

        <p>Remove this library and all books inside it?</p>

        <button onClick={onClose}> Cancel </button>

        <button onClick={removeLibrary}> Remove </button>

      </div>
    </div>
  )
}

export default RemoveLibraryConfirmation