import Navbar from '../components/Navbar'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import AddBookConfirmation from '../components/AddBookConfirmation'
import ManualAddBook from '../components/ManualAddBook'
import RemoveBookConfirmation from '../components/RemoveBookConfirmation'

import ScanBook from '../components/ScanBook'


function LibraryPage() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const [showAddBook, setShowAddBook] = useState(false);
    const [showManualAddBook, setShowManualAddBook] = useState(false);
    const [removeMode, setRemoveMode] = useState(false);
    const [bookNotFound, setBookNotFound] = useState(false);

    const [bookToAdd, setBookToAdd] = useState(null);


    const [bookToRemove, setBookToRemove] = useState(null);

    // FIX
    const location = useLocation();
    const { library, selectedGenres, selectedQuery } = location.state;
    // END FIX

    useEffect(() => {
        let url = `/api/books/${library.id}`;

        if (selectedGenres.length > 0) {
            url += `?genres=${selectedGenres.join(",")}`;
        }

        if (selectedQuery) {
            url += `${selectedGenres.length > 0 ? "&" : "?"}query=${selectedQuery}`;
        }
        
        fetch(url)
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error(error));

    }, []);

    async function refreshBooks() {
        const response = await fetch(`/api/books/${library.id}`);
        const data = await response.json();
        setBooks(data);
    }

    return (
        <div id="library-page">
            <Navbar showBack />

            <div id="library-header">
                <h1>{library.name}</h1>
                <p>{library.location_name.split(",").slice(0, 3).join(",")}</p>
            </div>

            <div id="book-list">
                {books.map((book) => ( 
                    
                    <div className="book-card" key={book.id} onClick={() => navigate('/book', { state: book })}>
                        {removeMode && <button onClick={(e) => {e.stopPropagation(); setBookToRemove(book)}} id="remove-x">×</button>}
                        <img src={book.cover_image ? (book.cover_image.startsWith("http") ? book.cover_image : `/books/${book.cover_image}`) : "/books/book_not_found.jpg"} alt={book.title} />
                        <p>{book.title}</p>
                    </div>
                ))}
            </div>

            <div id="book-actions">
                <button id="remove-book-button" onClick={() => setRemoveMode(!removeMode)}>{removeMode ? "Done" : "Remove Books"}</button>
                <ScanBook setBookToAdd={setBookToAdd} setShowAddBook={setShowAddBook} setShowManualAddBook={setShowManualAddBook} setBookNotFound={setBookNotFound}/>
            </div>

            {showAddBook && bookToAdd && (<AddBookConfirmation libraryId={library.id} book={bookToAdd} onClose={() => setShowAddBook(false)} refreshBooks={refreshBooks}/>)}

            {showManualAddBook && bookToAdd && <ManualAddBook libraryId={library.id} book={bookToAdd} setBookToAdd={setBookToAdd} setShowManualAddBook={setShowManualAddBook} refreshBooks={refreshBooks} bookNotFound={bookNotFound} />}

            {bookToRemove && (<RemoveBookConfirmation book={bookToRemove} onClose={() => setBookToRemove(null)} refreshBooks={refreshBooks}/>)}

                
        </div>
    )
}

export default LibraryPage