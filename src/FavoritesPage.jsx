import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieSearch.css";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((m) => m.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="app">
      <h1>⭐ Favorite Movies</h1>
<button
  onClick={() => navigate("/")}
  style={{
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "4px",
    cursor: "pointer"
  }}
>
  🔙 Back to Home
</button>

      <div className="grid">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div key={movie.imdbID} className="card">
              <img src={movie.Poster} alt={movie.Title} />

              <div className="details">
                <h3>{movie.Title}</h3>

                <button onClick={() => removeFavorite(movie.imdbID)}>
                  💔 Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite movies yet</p>
        )}
      </div>
    </div>
  );
}