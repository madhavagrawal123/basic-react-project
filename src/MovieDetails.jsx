import "./MovieDetails.css";

export default function MovieDetails({ movie, onBack }) {
  if (!movie) return null;

  return (
    <div className="movieDetails">
      <img src={movie.poster} alt={movie.title} />

      <div className="movieInfo">
        <h2>{movie.title}</h2>

        <div className="metaGrid">
          <div className="metaItem">
            <span>Year</span>
            <strong>{movie.year}</strong>
          </div>

          <div className="metaItem">
            <span>IMDB</span>
            <strong className="imdb">⭐ {movie.rating}</strong>
          </div>

          <div className="metaItem">
            <span>Director</span>
            <strong>{movie.director}</strong>
          </div>

          <div className="metaItem">
            <span>Actors</span>
            <strong>{movie.actors}</strong>
          </div>

          <div className="metaItem">
            <span>Runtime</span>
            <strong>{movie.runtime}</strong>
          </div>

          <div className="metaItem">
            <span>Genre</span>
            <strong>{movie.genre}</strong>
          </div>

          {movie.rtScore !== "N/A" && (
            <div className="metaItem">
              <span>Rotten Tomatoes</span>
              <strong className="rt">🍅 {movie.rtScore}</strong>
            </div>
          )}
        </div>

        <p className="plot">📝 {movie.plot}</p>

        {movie.awards && (
          <div className="awards">🏆 {movie.awards}</div>
        )}

        <button onClick={onBack} className="backBtn">
          🔙 Back to Search
        </button>
      </div>
    </div>
  );
}