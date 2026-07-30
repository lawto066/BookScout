function AddBookConfirmation({ libraryId, book, onClose, refreshBooks }) {
  async function addBook() {
    await fetch("/api/books/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          library_id: libraryId,
          title: book.title,
          author: book.author,
          publication_year: book.publication_year,
          genre: book.genre,
          synopsis: book.synopsis,
          isbn: book.isbn,
          cover_image: book.cover_image
      }),
    });

    await refreshBooks();

    onClose();
  }

  return (
    <div id="modal-overlay">
      <div id="add-book-confirmation">
        <img src={book.cover_image?.startsWith("http") ? book.cover_image : `/books/${book.cover_image}` } alt={book.title} />

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