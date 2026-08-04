function ManualAddBook({ libraryId, book, setBookToAdd, setShowManualAddBook, refreshBooks }) {

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
        publication_year: book.publication_year ? Number(book.publication_year) : null,
        genre: book.genre,
        synopsis: book.synopsis,
        isbn: book.isbn,
        cover_image: book.cover_image
      }),
    });

    await refreshBooks();

    setShowManualAddBook(false);
  }

  return (
    <div id="manual-add-overlay">
      <div id="manual-add-popup">
        <h2>Book Not Found</h2>

        <p>
          We couldn't find this book in our database.
          Please add the details manually.
        </p>

        <input
          placeholder="Title"
          value={book.title}
          onChange={(e) =>
            setBookToAdd({ ...book, title: e.target.value })
          }
        />

        <input
          placeholder="Author"
          value={book.author}
          onChange={(e) =>
            setBookToAdd({ ...book, author: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Publication Year"
          value={book.publication_year}
          onChange={(e) =>
            setBookToAdd({ ...book, publication_year: e.target.value })
          }
        />

        <input
          placeholder="Genre"
          value={book.genre}
          onChange={(e) =>
            setBookToAdd({ ...book, genre: e.target.value })
          }
        />

        <textarea
          placeholder="Synopsis (optional)"
          value={book.synopsis}
          onChange={(e) =>
            setBookToAdd({ ...book, synopsis: e.target.value })
          }
        />


        <div id="manual-add-buttons">
          <button onClick={() => setShowManualAddBook(false)}>
            Cancel
          </button>

          <button onClick={addBook}>
            Add Book
          </button>
        </div>

      </div>
    </div>
  );
}

export default ManualAddBook;