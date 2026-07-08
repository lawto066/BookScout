function RemoveBookConfirmation({ book, onClose }) {
  return (
    <div id="modal-overlay">
      <div id="add-book-confirmation">
        <img src={book.image} alt={book.title} />

        <h2>{book.title}</h2>

        <p>Remove this book from this library?</p>

        <button onClick={onClose}> Cancel </button>

        <button onClick={onClose}> Remove </button>

      </div>
    </div>
  )
}

export default RemoveBookConfirmation