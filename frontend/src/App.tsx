import { GameProvider } from './state/GameContext';
import { useGame } from './state/useGame';
import AdventureView from './components/adventure/AdventureView';
import PortfolioMode from './components/portfolio/PortfolioMode';
import ErrorBoundary from './components/shell/ErrorBoundary';

const Shell = () => {
  const { mode } = useGame();
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div id="main">{mode === 'adventure' ? <AdventureView /> : <PortfolioMode />}</div>
    </>
  );
};

const App = () => (
  <GameProvider>
    <ErrorBoundary>
      <Shell />
    </ErrorBoundary>
  </GameProvider>
);

export default App;
