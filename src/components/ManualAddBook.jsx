import { useState } from "react";

function ManualAddBook({ libraryId, book, setBookToAdd, setShowManualAddBook, refreshBooks, bookNotFound, noCamera }) {
  const [error, setError] = useState("");

  async function addBook() {
    if (!book.title.trim()) {
        setError("Title is required.");
        return;
    }

    if (!book.author.trim()) {
        setError("Author is required.");
        return;
    }

    if (!book.genre.trim()) {
        setError("Genre is required.");
        return;
    }

    setError("");

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
        {bookNotFound ? (
            <>
                <h2>Book Not Found</h2>
                <p>
                    We couldn't find this book in our database.
                    Please add the details manually.
                </p>
            </>
        ) : noCamera ? (
            <>
                <h2>No Camera Found</h2>
                <p>
                    We couldn't access your camera.
                    Please add the book details manually.
                </p>
            </>
        ) : (
            <>
                <h2>Add Book Manually</h2>
                <p>Enter the book information below.</p>
            </>
        )}

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
          placeholder="Genre"
          value={book.genre}
          onChange={(e) =>
            setBookToAdd({ ...book, genre: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Publication Year (optional)"
          value={book.publication_year}
          onChange={(e) =>
            setBookToAdd({ ...book, publication_year: e.target.value })
          }
        />

        <textarea
          placeholder="Synopsis (optional)"
          value={book.synopsis}
          onChange={(e) =>
            setBookToAdd({ ...book, synopsis: e.target.value })
          }
        />

        {error && <p id="form-error">{error}</p>}


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