import { useState, useEffect } from "react";
import "./MovieSearch.css";
import MovieDetails from "./MovieDetails";
import { useNavigate } from "react-router-dom";

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const navigate = useNavigate();
  // const navigate = (path) => window.location.href = path;

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
   setFavorites((prev) =>
  prev.some((m) => m.imdbID === movie.imdbID)
    ? prev.filter((m) => m.imdbID !== movie.imdbID)
    : [...prev, movie]
);
  };

  const API_KEY = "ec06ac39";

  const handleSearch = async () => {
    if (!query) return;

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );
    const data = await res.json();

    if (data.Response === "False") {
      alert(data.Error);
      setMovies([]);
      return;
    }

    setMovies(data.Search);
    setSelectedMovie(null);
  };

  const handleDetails = async (id) => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    );
    const data = await res.json();

    if (data.Response === "False") {
      alert(data.Error);
      return;
    }

    setSelectedMovie({
      title: data.Title,
      year: data.Year,
      rated: data.Rated,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      actors: data.Actors,
      plot: data.Plot,
      rating: data.imdbRating,
      poster:
        data.Poster !== "N/A"
          ? data.Poster
          : "https://via.placeholder.com/300x450",
      rtScore:
        data.Ratings && data.Ratings.length > 1
          ? data.Ratings[1].Value
          : "N/A",
      awards: data.Awards, // ✅ FIXED (you missed this earlier)
    });
  };

  return (
   

    <div className="app">
      
     
        
          <div className="topBar">
  
  <button onClick={() => navigate("/favorites")}>
    ⭐ Favorites
  </button>
</div> 
      <div className="searchSection">
       
        <h1>🎬 Movie Finder</h1>

        <div className="searchBox">
          <input
            type="text"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>

         
        </div>
        
      </div>

      {selectedMovie ? (
        <MovieDetails
          movie={selectedMovie}
          onBack={() => setSelectedMovie(null)}
        />
      ) : (
        <>
          <h2>🎬 Results</h2>

          <div className="grid">
            {movies.length > 0 ? (
              movies.map(({ imdbID, Title, Year, Poster }) => (
                <div className="card" key={imdbID}>
                  <img
                    src={
                      Poster !== "N/A"
                        ? Poster
                        : "https://via.placeholder.com/300x450"
                    }
                    alt={Title}
                  />

                  <div className="details">
                    <h2>{Title}</h2>
                    <p>
                      <span>Year:</span> {Year}
                    </p>

                    <button onClick={() => handleDetails(imdbID)}>
                      View Details
                    </button>

                    <button
                      onClick={() =>
                        toggleFavorite({ imdbID, Title, Year, Poster })
                      }
                    >
                      {favorites.some((m) => m.imdbID === imdbID)
                        ? "💔 Remove"
                        : "❤️ Favorite"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="noResults">Search for a movie</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}