import { useEffect, useRef, useState, useCallback } from 'react';

import SearchBar from '../components/SearchBar.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import { Spinner, ErrorMessage, EmptyState } from '../components/StatusStates.jsx';
import { searchMovies } from '../api/movieApi.js';

const SUGGESTIONS = ['Avengers', 'Inception', 'Interstellar', 'The Dark Knight'];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const lastQuery = useRef('');

  const runSearch = useCallback(async (title) => {
    lastQuery.current = title;
    setLoading(true);
    setError('');
    setHasSearched(true);
    try {
      const data = await searchMovies(title);
      // Ignore stale responses if the user searched again meanwhile
      if (lastQuery.current !== title) return;
      setMovies(data.movies || []);
      setTotalResults(data.totalResults || 0);
    } catch (err) {
      if (lastQuery.current !== title) return;
      setMovies([]);
      setTotalResults(0);
      setError(err.message || 'Failed to search movies.');
    } finally {
      if (lastQuery.current === title) setLoading(false);
    }
  }, []);

  function handleSearch(title) {
    setQuery(title);
    runSearch(title);
  }

  // Auto-run the initial search once so the page isn't empty on load
  useEffect(() => {
    runSearch('Avengers');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container home">
      <div className="hero">
        <p className="hero__eyebrow">🎬 Search · Discover · Explore</p>
        <h1 className="hero__title">
          Find your next <span className="gradient-text">favorite movie</span>
        </h1>
        <p className="hero__subtitle">
          Look up any title and explore posters, ratings, cast, crew and full plot details.
        </p>

        <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} loading={loading} />

        <div className="hero__suggestions" aria-label="Suggested searches">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="chip"
              onClick={() => handleSearch(s)}
              disabled={loading}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading && <Spinner label="Searching movies…" />}

      {!loading && error && <ErrorMessage message={error} onRetry={() => runSearch(lastQuery.current)} />}

      {!loading && !error && hasSearched && movies.length === 0 && (
        <EmptyState message="Movie not found. Try searching for another movie!" />
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <div className="results-head">
            <h2>
              Results for “<span className="gradient-text">{lastQuery.current}</span>”
            </h2>
            <p className="muted">{totalResults.toLocaleString()} titles found</p>
          </div>
          <MovieGrid movies={movies} />
        </>
      )}
    </section>
  );
}
