import { Component, type ReactNode } from 'react';
import { profile } from '../../data/profile';

// Recoverable boundary: resume + profiles stay reachable even if 3D fails.
class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    console.error('Floating Islands error:', error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div role="alert" className="flex min-h-full flex-col items-center justify-center gap-4 bg-ink p-8 text-center">
          <h2 className="font-display text-2xl font-black text-parchment">Something glitched on this trail.</h2>
          <p className="text-slate-dim">The important paths still work.</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => this.setState({ hasError: false })}
              className="rounded-lg bg-lantern px-5 py-2.5 font-bold text-ink-2">Try again</button>
            <a href={profile.resumePath} target="_blank" rel="noopener noreferrer"
              className="rounded-lg border border-parchment/25 px-5 py-2.5 font-semibold text-parchment">Resume (PDF)</a>
            <a href="https://github.com/Abhijeet83193" target="_blank" rel="noopener noreferrer"
              className="rounded-lg border border-parchment/25 px-5 py-2.5 font-semibold text-parchment">GitHub</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
