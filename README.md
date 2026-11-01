# CinePulse Frontend (React + Vite + React Router)

The CinePulse movie search & discovery UI: search → discover → explore.

## Run

```bash
npm install
npm run dev       # http://localhost:5173 (proxies /api → localhost:5000)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | `HomePage` | Hero + search bar, suggestion chips, responsive results grid |
| `/movie/:imdbID` | `MovieDetailsPage` | Full movie details with **Back to Search** |
| `*` | `NotFoundPage` | 404 with illustration and back link |

## Components

- `Navbar` / `Footer` — app chrome
- `SearchBar` — controlled input with clear button + empty-field validation
- `MovieGrid` / `MovieCard` — responsive card grid (poster, title, year, ⭐ rating, 📖 plot)
- `StatusStates` — reusable `Spinner`, `ErrorMessage`, `EmptyState`

## API client

`src/api/movieApi.js` talks to the Express backend:

```js
searchMovies('Avengers')   // GET /api/movies/search?q=Avengers
getMovieDetails('tt0848228') // GET /api/movies/tt0848228
```

Set `VITE_API_URL` in `.env` to point at a deployed backend (defaults to `/api`, proxied in dev).
