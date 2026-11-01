import { Link } from 'react-router-dom';

const PLACEHOLDER_POSTER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450">
      <rect width="300" height="450" fill="#1b1f27"/>
      <text x="150" y="230" font-family="sans-serif" font-size="18" fill="#5b6472" text-anchor="middle">No Poster</text>
    </svg>`
  );

export default function MovieCard({ movie }) {
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_POSTER;

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <div className="movie-card__poster-wrap">
        <img
          className="movie-card__poster"
          src={poster}
          alt={`${movie.Title} poster`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_POSTER;
          }}
        />
        <span className="movie-card__rating">⭐ {movie.imdbRating || 'N/A'}</span>
        <div className="movie-card__overlay">
          <span>View details →</span>
        </div>
      </div>

      <div className="movie-card__body">
        <h3 className="movie-card__title" title={movie.Title}>
          {movie.Title}
        </h3>
        <div className="movie-card__meta">
          <span className="movie-card__year">📅 {movie.Year}</span>
          <span className="movie-card__type">{movie.Type}</span>
        </div>
        {movie.Plot && <p className="movie-card__plot">{movie.Plot}</p>}
      </div>
    </Link>
  );
}
