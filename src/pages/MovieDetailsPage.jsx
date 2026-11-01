import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { Spinner, ErrorMessage } from '../components/StatusStates.jsx';
import { getMovieDetails } from '../api/movieApi.js';

const PLACEHOLDER_POSTER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450">
      <rect width="300" height="450" fill="#1b1f27"/>
      <text x="150" y="230" font-family="sans-serif" font-size="18" fill="#5b6472" text-anchor="middle">No Poster</text>
    </svg>`
  );

/** Row of label + value; hides itself when the value is missing. */
function DetailRow({ label, value, emoji }) {
  if (!value || value === 'N/A') return null;
  return (
    <div className="detail-row">
      <span className="detail-row__label">
        <span aria-hidden="true">{emoji}</span> {label}
      </span>
      <span className="detail-row__value">{value}</span>
    </div>
  );
}

export default function MovieDetailsPage() {
  const { imdbID } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getMovieDetails(imdbID);
      setMovie(data.movie);
    } catch (err) {
      setError(err.message || 'Failed to load movie details.');
    } finally {
      setLoading(false);
    }
  }, [imdbID]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <section className="container">
        <Spinner label="Loading movie details…" />
      </section>
    );
  }

  if (error || !movie) {
    return (
      <section className="container">
        <ErrorMessage message={error || 'Movie not found. Try searching for another movie!'} onRetry={load} />
        <div className="details__actions">
          <button type="button" className="btn btn--ghost" onClick={() => navigate('/')}>
            ⬅ Back to Search
          </button>
        </div>
      </section>
    );
  }

  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_POSTER;
  const rated = movie.imdbRating && movie.imdbRating !== 'N/A';

  return (
    <section className="container details">
      <div className="details__actions">
        <button type="button" className="btn btn--ghost" onClick={() => navigate('/')}>
          ⬅ Back to Search
        </button>
        <Link to="/" className="details__home-link">Or start a new search</Link>
      </div>

      <article className="details__card">
        <div className="details__poster-col">
          <img
            className="details__poster"
            src={poster}
            alt={`${movie.Title} poster`}
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER_POSTER;
            }}
          />
          {rated && (
            <div className="details__rating-badge">
              ⭐ <strong>{movie.imdbRating}</strong>
              <span>/10 IMDb</span>
            </div>
          )}
        </div>

        <div className="details__info-col">
          <header className="details__header">
            <h1 className="details__title">{movie.Title}</h1>
            <div className="details__tags">
              <span className="tag">📅 {movie.Year}</span>
              {movie.Rated && movie.Rated !== 'N/A' && <span className="tag">🔞 {movie.Rated}</span>}
              {movie.Runtime && movie.Runtime !== 'N/A' && <span className="tag">⏱ {movie.Runtime}</span>}
              {movie.Type && <span className="tag tag--accent">🎞 {movie.Type}</span>}
            </div>
          </header>

          <div className="details__ratings">
            {Array.isArray(movie.Ratings) && movie.Ratings.length > 0 ? (
              movie.Ratings.map((r) => (
                <div className="rating-pill" key={r.Source}>
                  <span className="rating-pill__source">{r.Source}</span>
                  <span className="rating-pill__value">{r.Value}</span>
                </div>
              ))
            ) : rated ? (
              <div className="rating-pill">
                <span className="rating-pill__source">IMDb</span>
                <span className="rating-pill__value">{movie.imdbRating}/10</span>
              </div>
            ) : null}
          </div>

          <div className="details__plot">
            <h2>📖 Plot</h2>
            <p>{movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : 'No plot available.'}</p>
          </div>

          <div className="details__grid">
            <DetailRow label="Genre" value={movie.Genre} emoji="🎭" />
            <DetailRow label="Director" value={movie.Director} emoji="🎥" />
            <DetailRow label="Actors" value={movie.Actors} emoji="👥" />
            <DetailRow label="Runtime" value={movie.Runtime} emoji="⏱️" />
            <DetailRow label="Language" value={movie.Language} emoji="🌍" />
            <DetailRow label="Country" value={movie.Country} emoji="🗺️" />
            <DetailRow label="Awards" value={movie.Awards} emoji="🏆" />
            <DetailRow label="Box Office" value={movie.BoxOffice} emoji="💰" />
            <DetailRow label="Writer" value={movie.Writer} emoji="✍️" />
            <DetailRow label="Released" value={movie.Released} emoji="📆" />
          </div>

          {movie.imdbID && (
            <a
              className="btn btn--primary details__imdb"
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
              rel="noreferrer"
            >
              View on IMDb →
            </a>
          )}
        </div>
      </article>
    </section>
  );
}
