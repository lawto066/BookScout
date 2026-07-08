import akotsk from '../assets/books/akotsk.jpeg'

function AddBookConfirmation({ onClose }) {
  const book = {
    title: "A Knight of the Seven Kingdoms",
    image: akotsk
  }

  return (
    <div id="modal-overlay">
      <div id="add-book-confirmation">
        <img src={book.image} alt={book.title} />

        <h2>{book.title}</h2>

        <p>Add book to this library?</p>

        <div>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onClose}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default AddBookConfirmation