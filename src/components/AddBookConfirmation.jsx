import akotsk from '/public/books/akotsk.jpeg'

function AddBookConfirmation({ libraryId, onClose, refreshBooks }) {
  const book = {
    title: "A Knight of the Seven Kingdoms",
    image: akotsk
  }

  async function addBook() {
    await fetch("/api/books/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            library_id: libraryId,
            title: "A Knight of the Seven Kingdoms",
            author: "George R.R. Martin",
            publication_year: 2015,
            genre: "Fantasy",
            synopsis: "A collection of three novellas following the adventures of Dunk and Egg in the world of Westeros.",
            isbn: "9780345539120",
            cover_image: "akotsk.jpeg"
        }),
    });

    await refreshBooks();

    onClose();
}

  return (
    <div id="modal-overlay">
      <div id="add-book-confirmation">
        <img src={book.image} alt={book.title} />

        <h2>{book.title}</h2>

        <p>Add book to this library?</p>

        <div>
          <button onClick={onClose}>Cancel</button>
          <button onClick={addBook}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default AddBookConfirmation