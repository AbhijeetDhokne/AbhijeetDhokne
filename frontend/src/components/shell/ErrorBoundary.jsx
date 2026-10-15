import { Component } from 'react';

// DEVSLAYER Phase 1 — recoverable error boundary for the app shell.
// Guarantees resume/contact remain reachable even if a section crashes.

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('DEVSLAYER shell error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div role="alert" className="shell-fallback" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--army-olive)' }}>Something glitched on this trail.</h2>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
            The page hit an error, but the important paths still work.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
            <a className="btn-primary" href={`${import.meta.env.BASE_URL}resume/resume_1.pdf`} target="_blank" rel="noopener noreferrer">
              Open resume (PDF)
            </a>
            <a className="btn-primary" href="https://github.com/Abhijeet83193" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
