import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'

function BookPage() {
    const location = useLocation()
    const book = location.state

    return (
    <div id="book-page">
        <Navbar showBack />

        <div id="book-details">
        <img src={book.cover_image ? (book.cover_image.startsWith("http") ? book.cover_image : `/books/${book.cover_image}`) : "/books/book_not_found.jpg"} alt={book.title} />

        <h1>{book.title}</h1>

        <div id="book-info">
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Year:</strong> {book.publication_year}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
        </div>

        <p>{book.synopsis}</p>
        </div>
    </div>
    )
}

export default BookPage