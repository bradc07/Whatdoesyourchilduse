import { useState } from 'react';
import type { Platform, Category } from './data/platforms';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { PlatformGrid } from './components/PlatformGrid';
import { PlatformDetail } from './components/PlatformDetail';
import { Dashboard } from './components/Dashboard';
import './App.css';

type View = 'selection' | 'dashboard';

function App() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [viewingPlatform, setViewingPlatform] = useState<Platform | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [view, setView] = useState<View>('selection');

  const handleSelectPlatform = (platform: Platform) => {
    setSelectedPlatforms(prev => {
      const isSelected = prev.some(p => p.id === platform.id);
      if (isSelected) {
        return prev.filter(p => p.id !== platform.id);
      }
      return [...prev, platform];
    });
  };

  const handleViewDetails = (platform: Platform) => {
    setViewingPlatform(platform);
  };

  const handleCloseDetails = () => {
    setViewingPlatform(null);
  };

  const handleViewDashboard = () => {
    setView('dashboard');
  };

  const handleBackToSelection = () => {
    setView('selection');
  };

  const handleRemoveFromDashboard = (platformId: string) => {
    setSelectedPlatforms(prev => prev.filter(p => p.id !== platformId));
  };

  return (
    <div className="app">
      <Header
        selectedCount={selectedPlatforms.length}
        onViewDashboard={handleViewDashboard}
        onBackToSelection={handleBackToSelection}
        currentView={view}
      />

      <main className="main-content">
        {view === 'selection' ? (
          <>
            <div className="intro-section">
              <h2>What does your child use?</h2>
              <p>Select the apps, games, and devices your child uses to get personalised safety guidance, parental control instructions, and conversation starters.</p>
            </div>

            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <PlatformGrid
              activeCategory={activeCategory}
              selectedPlatforms={selectedPlatforms}
              onSelectPlatform={handleSelectPlatform}
              onViewDetails={handleViewDetails}
            />
          </>
        ) : (
          <Dashboard
            selectedPlatforms={selectedPlatforms}
            onViewDetails={handleViewDetails}
            onRemovePlatform={handleRemoveFromDashboard}
          />
        )}
      </main>

      {viewingPlatform && (
        <PlatformDetail
          platform={viewingPlatform}
          isSelected={selectedPlatforms.some(p => p.id === viewingPlatform.id)}
          onClose={handleCloseDetails}
          onToggleSelect={() => handleSelectPlatform(viewingPlatform)}
        />
      )}
    </div>
  );
}

export default App;
