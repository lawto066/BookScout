import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal } from "lucide-react";

import GenreFilter from "./GenreFilter";

function SearchBooks({ query, setQuery, setSelectedQuery, selectedGenres, setSelectedGenres }) {
    const [showFilters, setShowFilters] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const justSelected = useRef(false);

    useEffect(() => {
        if (justSelected.current) {
            justSelected.current = false;
            return;
        }

        if (query.length < 2) {
            return;
        }

        fetch(`/api/search?q=${query}`)
            .then(response => response.json())
            .then(data => setSearchResults(data))
            .catch(error => console.error(error));

    }, [query]);

    return (
        <div id="search-books">
            <div id="book-search-input">
                <input placeholder="Search books or authors..." value={query} onChange={(e) => {setQuery(e.target.value); setSelectedQuery(""); if (e.target.value.length < 2) {setSearchResults([])}}} />
                {query && <button type="button" id="clear-book-search" onClick={() => {setQuery(""); setSelectedQuery(""); setSearchResults([]);}}>×</button>}
            </div>
            
            {searchResults.length > 0 && (
                <div id="search-results-dropdown">
                    {searchResults.map((book) => (
                        <div key={`${book.type}-${book.id}`} className="search-result" onClick={() => {justSelected.current = true; setQuery(book.title); setSelectedQuery(book.title); setSearchResults([]);}}>
                            <p>{book.title}</p>
                            <span>{book.author}</span>
                        </div>
                    ))}
                </div>
            )}

            <button id="filter-button" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal />
            </button>

            {showFilters && (
                <GenreFilter setShowFilters={setShowFilters} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
            )}
        </div>
    );
}

export default SearchBooks;