import { useState } from "react";

function GenreFilter({ setShowFilters, selectedGenres, setSelectedGenres }) {
  const [tempGenres, setTempGenres] = useState(selectedGenres);

  const genres = [
    "Fantasy",
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Horror",
    "Adventure",
    "History",
    "Biography",
    "Nonfiction",
    "Young Adult",
    "Children's",
    "Comedy",
    "Drama",
    "Poetry",
    "Other"
  ];

  function toggleGenre(genre) {
    if (tempGenres.includes(genre)) {
      setTempGenres(
        tempGenres.filter((g) => g !== genre)
      );
    } else {
      setTempGenres([
        ...tempGenres,
        genre
      ]);
    }
  }

  function applyFilters() {
    setSelectedGenres(tempGenres);
    setShowFilters(false);
  }

  return (
    <div id="genre-filter-overlay">
      <div id="genre-filter-popup">

        <h2>Filter by Genre</h2>

        <div id="genre-list">
          {genres.map((genre) => (
            <label key={genre}>
              <input type="checkbox" checked={tempGenres.includes(genre)} onChange={() => toggleGenre(genre)}/>
              {genre}
            </label>
          ))}
        </div>

        <div id="genre-filter-buttons">
          <button onClick={() => setShowFilters(false)}>Cancel</button>

          <button onClick={applyFilters}>Apply</button>
        </div>

      </div>
    </div>
  );
}

export default GenreFilter;