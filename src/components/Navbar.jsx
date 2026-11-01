import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" aria-label="CinePulse home">
          <span className="navbar__logo" aria-hidden="true">◉</span>
          <span className="navbar__title">
            Cine<span className="navbar__title-accent">Pulse</span>
          </span>
        </Link>
        <nav className="navbar__nav" aria-label="Main">
          <Link to="/" className="navbar__link">🔎 Search</Link>
        </nav>
      </div>
    </header>
  );
}
