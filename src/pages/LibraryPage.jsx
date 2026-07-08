import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AddBookConfirmation from '../components/AddBookConfirmation'
import RemoveBookConfirmation from '../components/RemoveBookConfirmation'

// TEMP DATA
import lotr from '../assets/books/lotr.jpeg'
import akotsk from '../assets/books/akotsk.jpeg'
import wtwta from '../assets/books/wtwta.jpeg'
import tgg from '../assets/books/tgg.jpeg'
// END TEMP DATA

function LibraryPage() {
    // TEMP DATA
    const library = {
        name: "Hoboken Hobo's Book Nook",
        location: "123 Oak Street",
        books: [
        {
            title: "The Lord of the Rings: The Fellowship of the Ring",
            author: "J.R.R. Tolkien",
            year: 1954,
            genre: "Fantasy",
            synopsis: "A young hobbit named Frodo inherits a powerful ring and begins a dangerous journey to destroy it before it falls into the hands of the Dark Lord Sauron.",
            image: lotr
        },
        {
            title: "A Knight of the Seven Kingdoms",
            author: "George R.R. Martin",
            year: 2015,
            genre: "Fantasy",
            synopsis: "A collection of three adventures following the hedge knight Dunk and his young squire Egg as they travel through the world of Westeros.",
            image: akotsk
        },
        {
            title: "Where the Wild Things Are",
            author: "Maurice Sendak",
            year: 1963,
            genre: "Children's Fantasy",
            synopsis: "A young boy named Max sails away to a mysterious island inhabited by wild creatures and discovers a world of imagination and adventure.",
            image: wtwta
        },
        {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            year: 1925,
            genre: "Classic Fiction",
            synopsis: "A mysterious millionaire throws extravagant parties while pursuing a lost love during the Jazz Age in 1920s America.",
            image: tgg
        }
        ]
    }
    // END TEMP DATA

    const navigate = useNavigate();

    const [showAddBook, setShowAddBook] = useState(false);
    const [removeMode, setRemoveMode] = useState(false);
    const [bookToRemove, setBookToRemove] = useState(null);

    return (
        <div id="library-page">
            <Navbar showBack />

            <div id="library-header">
                <h1>{library.name}</h1>
                <p>{library.location}</p>
            </div>

            <div id="book-list">
                {library.books.map((book) => (
                    <div className="book-card" key={book.title} onClick={() => navigate('/book', { state: book })}>
                        {removeMode && <button onClick={(e) => {e.stopPropagation(); setBookToRemove(book)}} id="remove-book-x">×</button>}
                        <img src={book.image} alt={book.title} />
                        <p>{book.title}</p>
                    </div>
                ))}
            </div>

            <div id="book-actions">
                <button onClick={() => setShowAddBook(true)}>Add Book</button>
                <button onClick={() => setRemoveMode(true)}>Remove Book</button>
            </div>

            {showAddBook && (<AddBookConfirmation onClose={() => setShowAddBook(false)}/>)}

            {bookToRemove && (<RemoveBookConfirmation book={bookToRemove} onClose={() => setBookToRemove(null)}/>)}
                
        </div>
    )
}

export default LibraryPage