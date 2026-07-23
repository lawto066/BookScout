function RemoveBookConfirmation({ book, onClose, refreshBooks }) {

  async function removeBook() {
    await fetch(`/api/books/${book.id}`, {
        method: "DELETE",
    });

    await refreshBooks();

    onClose();
  }

  return (
    <div id="modal-overlay">
      <div id="add-book-confirmation">
        <img src={`/books/${book.cover_image}`} alt={book.title} />

        <h2>{book.title}</h2>

        <p>Remove this book from this library?</p>

        <button onClick={onClose}> Cancel </button>

        <button onClick={removeBook}> Remove </button>

      </div>
    </div>
  )
}

export default RemoveBookConfirmation