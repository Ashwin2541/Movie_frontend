export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="state-block" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p className="state-text">{label}</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-block state-block--error" role="alert">
      <span className="state-icon" aria-hidden="true">⚠️</span>
      <p className="state-text">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn--ghost" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message }) {
  return (
    <div className="state-block" role="status">
      <span className="state-icon" aria-hidden="true">🎬</span>
      <p className="state-text">{message}</p>
    </div>
  );
}
