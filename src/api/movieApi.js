/**
 * API client for the CinePulse backend (Express).
 * In dev, Vite proxies `/api` to http://localhost:5000 (see vite.config.js).
 * In production, set VITE_API_URL to your deployed backend URL.
 */

const API_BASE = 'https://movie-backend-zbsz.onrender.com/api'

async function request(path) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`);
  } catch {
    // Network failure (backend not running, offline, etc.)
    throw new Error('Unable to reach the server. Please make sure the backend is running.');
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Unexpected response from the server.');
  }

  if (!res.ok || !data.success) {
    const error = new Error(data.message || 'Something went wrong. Please try again.');
    error.status = res.status;
    throw error;
  }

  return data;
}

/** Search movies by title → { query, totalResults, movies } */
export function searchMovies(query, page = 1) {
  const params = new URLSearchParams({ q: query });
  if (page > 1) params.set('page', String(page));
  return request(`/movies/search?${params.toString()}`);
}

/** Get full details for one movie by imdbID → { movie } */
export function getMovieDetails(imdbID) {
  return request(`/movies/${encodeURIComponent(imdbID)}`);
}
