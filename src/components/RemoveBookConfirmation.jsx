function RemoveBookConfirmation({ book, onClose, refreshBooks }) {

  async function removeBook() {
    await fetch(`http://localhost:5000/api/books/${book.id}`, {
        method: "DELETE",
    });

    await refreshBooks();

    onClose();
  }

  return (
    <div id="modal-overlay">
      <div id="add-book-confirmation">
        <img src={book.image} alt={book.title} />

        <h2>{book.title}</h2>

        <p>Remove this book from this library?</p>

        <button onClick={onClose}> Cancel </button>

        <button onClick={removeBook}> Remove </button>

      </div>
    </div>
  )
}

export default RemoveBookConfirmation