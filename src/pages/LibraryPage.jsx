import Navbar from '../components/Navbar'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import AddBookConfirmation from '../components/AddBookConfirmation'
import RemoveBookConfirmation from '../components/RemoveBookConfirmation'


function LibraryPage() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const [showAddBook, setShowAddBook] = useState(false);
    const [removeMode, setRemoveMode] = useState(false);
    const [bookToRemove, setBookToRemove] = useState(null);

    const location = useLocation();
    const library = location.state;

    useEffect(() => {
        fetch("http://localhost:5000/api/books")
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error(error));
    }, []);

    async function refreshBooks() {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();
        setBooks(data);
    }


    return (
        <div id="library-page">
            <Navbar showBack />

            <div id="library-header">
                <h1>{library.name}</h1>
                <p>{library.location}</p>
            </div>

            <div id="book-list">
                {books.map((book) => ( 
                    
                    <div className="book-card" key={book.id} onClick={() => navigate('/book', { state: book })}>
                        {removeMode && <button onClick={(e) => {e.stopPropagation(); setBookToRemove(book)}} id="remove-book-x">×</button>}
                        <img src={`/books/${book?.cover_image}`} alt={book.title} />
                        <p>{book.title}</p>
                    </div>
                ))}
            </div>

            <div id="book-actions">
                <button onClick={() => setShowAddBook(true)}>Add Book</button>
                <button onClick={() => setRemoveMode(true)}>Remove Book</button>
            </div>

            {showAddBook && (<AddBookConfirmation onClose={() => setShowAddBook(false)} refreshBooks={refreshBooks}/>)}

            {bookToRemove && (<RemoveBookConfirmation book={bookToRemove} onClose={() => setBookToRemove(null)} refreshBooks={refreshBooks}/>)}
                
        </div>
    )
}

export default LibraryPage