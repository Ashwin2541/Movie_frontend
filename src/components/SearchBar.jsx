import { useState } from 'react';

export default function SearchBar({ value, onChange, onSearch, loading }) {
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Please enter a movie title to search.');
      return;
    }
    setError('');
    onSearch(trimmed);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <div className="search-bar__field">
        <svg
          className="search-bar__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          className="search-bar__input"
          placeholder="Search for a movie… e.g. Avengers"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (error) setError('');
          }}
          aria-label="Movie title"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={() => onChange('')}
            aria-label="✕ Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <button type="submit" className="btn btn--primary" disabled={loading}>
        {loading ? 'Searching…' : 'Search'}
      </button>
      {error && <p className="search-bar__error">{error}</p>}
    </form>
  );
}
