import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import GenreFilter from "./GenreFilter";

function SearchBooks({ selectedGenres, setSelectedGenres }) {
    const [query, setQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);


    return (
        <div id="search-books">
            <input placeholder="Search books or authors..." value={query} onChange={(e) => setQuery(e.target.value)} />

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