import Navbar from "../components/Navbar";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import AddBookConfirmation from "../components/AddBookConfirmation";
import ManualAddBook from "../components/ManualAddBook";
import RemoveBookConfirmation from "../components/RemoveBookConfirmation";

import ScanBook from "../components/ScanBook";

import "./LibraryPage.css";

function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [library, setLibrary] = useState(null);
  const navigate = useNavigate();

  const [showAddBook, setShowAddBook] = useState(false);
  const [showManualAddBook, setShowManualAddBook] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [bookNotFound, setBookNotFound] = useState(false);
  const [noCamera, setNoCamera] = useState(false);
  const [libraryNotFound, setLibraryNotFound] = useState(false);

  const [bookToAdd, setBookToAdd] = useState(null);
  const [bookToRemove, setBookToRemove] = useState(null);

  const location = useLocation();
  const { id } = useParams();

  // Get the search and genre filters from the map.
  const { selectedGenres = [], selectedQuery = "" } = location.state || {};

  // Get the library information.
  useEffect(() => {
    fetch(`/api/libraries/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Library not found");
        }

        return response.json();
      })
      .then((data) => setLibrary(data))
      .catch(() => setLibraryNotFound(true));
  }, [id]);

  // Get the books for this library using the selected filters.
  useEffect(() => {
    let url = `/api/books/${id}`;

    if (selectedGenres.length > 0) {
      url += `?genres=${selectedGenres.join(",")}`;
    }

    if (selectedQuery) {
      url += `${selectedGenres.length > 0 ? "&" : "?"}query=${selectedQuery}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error(error));
  }, [id, selectedGenres, selectedQuery]);

  // Refresh the books after adding or removing a book.
  async function refreshBooks() {
    const response = await fetch(`/api/books/${library.id}`);
    const data = await response.json();
    setBooks(data);
  }

  // Show an error if the library could not be found.
  if (libraryNotFound) {
    return (
      <div id="library-page">
        <Navbar showBack backTo="/" />

        <div id="library-not-found">
          <p>Library not found.</p>
        </div>
      </div>
    );
  }

  if (!library) {
    return <p>Loading...</p>;
  }

  return (
    <div id="library-page">
      <Navbar showBack backTo="/" />

      <div id="library-header">
        <h1>{library.name.split("#")[0].trim()}</h1>
        <p>{library.location_name.split(",").slice(0, 3).join(",")}</p>
      </div>

      <div id="book-list">
        {books.length === 0 ? (
          <div id="empty-library">
            <h2>No books yet</h2>
            <p>
              Looks like this library doesn't have any books listed yet. You can
              add a book to help get this library started.
            </p>
          </div>
        ) : (
          books.map((book) => (
            <div
              className="book-card"
              key={book.id}
              onClick={() => navigate("/book", { state: book })}
            >
              {removeMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setBookToRemove(book);
                    setRemoveMode(false);
                  }}
                  id="remove-x"
                >
                  ×
                </button>
              )}

              <img
                src={
                  book.cover_image
                    ? book.cover_image.startsWith("http")
                      ? book.cover_image
                      : `/books/${book.cover_image}`
                    : "/books/book_not_found.jpg"
                }
                alt={book.title}
              />

              <p>{book.title}</p>
              <span>
                {book.author} · {book.genre}
              </span>
            </div>
          ))
        )}
      </div>

      <div id="book-actions">
        <button
          id="remove-book-button"
          onClick={() => setRemoveMode(!removeMode)}
        >
          {removeMode ? "Cancel" : "Remove Book"}
        </button>

        <ScanBook
          setBookToAdd={setBookToAdd}
          setShowAddBook={setShowAddBook}
          setShowManualAddBook={setShowManualAddBook}
          setBookNotFound={setBookNotFound}
          setNoCamera={setNoCamera}
        />
      </div>

      {showAddBook && bookToAdd && (
        <AddBookConfirmation
          libraryId={library.id}
          book={bookToAdd}
          onClose={() => setShowAddBook(false)}
          refreshBooks={refreshBooks}
        />
      )}

      {showManualAddBook && bookToAdd && (
        <ManualAddBook
          libraryId={library.id}
          book={bookToAdd}
          setBookToAdd={setBookToAdd}
          setShowManualAddBook={setShowManualAddBook}
          refreshBooks={refreshBooks}
          bookNotFound={bookNotFound}
          noCamera={noCamera}
        />
      )}

      {bookToRemove && (
        <RemoveBookConfirmation
          book={bookToRemove}
          onClose={() => setBookToRemove(null)}
          refreshBooks={refreshBooks}
        />
      )}
    </div>
  );
}

export default LibraryPage;
