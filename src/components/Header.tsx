interface HeaderProps {
  selectedCount: number;
  onViewDashboard: () => void;
  onBackToSelection: () => void;
  currentView: 'selection' | 'dashboard';
}

export function Header({ selectedCount, onViewDashboard, onBackToSelection, currentView }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🛡️</span>
          <h1>What Does Your Child Use?</h1>
        </div>

        <nav className="header-nav">
          {currentView === 'selection' ? (
            <button
              className="dashboard-button"
              onClick={onViewDashboard}
              disabled={selectedCount === 0}
            >
              View My Guide
              {selectedCount > 0 && (
                <span className="badge">{selectedCount}</span>
              )}
            </button>
          ) : (
            <button
              className="back-button"
              onClick={onBackToSelection}
            >
              ← Add More
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
