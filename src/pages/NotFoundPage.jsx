import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="container notfound">
      {imgOk && (
        <img
          src="/404.svg"
          alt=""
          className="notfound__art"
          onError={() => setImgOk(false)}
        />
      )}
      <h1>404 — Page Not Found</h1>
      <p className="muted">The page you are looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn btn--primary">⬅ Back to Search</Link>
    </section>
  );
}
