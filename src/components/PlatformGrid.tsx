import { platforms } from '../data/platforms';
import type { Platform, Category } from '../data/platforms';
import { PlatformCard } from './PlatformCard';

interface PlatformGridProps {
  activeCategory: Category | 'all';
  selectedPlatforms: Platform[];
  onSelectPlatform: (platform: Platform) => void;
  onViewDetails: (platform: Platform) => void;
}

export function PlatformGrid({
  activeCategory,
  selectedPlatforms,
  onSelectPlatform,
  onViewDetails
}: PlatformGridProps) {
  const filteredPlatforms = activeCategory === 'all'
    ? platforms
    : platforms.filter(p => p.category === activeCategory);

  return (
    <div className="platform-grid">
      {filteredPlatforms.map(platform => (
        <PlatformCard
          key={platform.id}
          platform={platform}
          isSelected={selectedPlatforms.some(p => p.id === platform.id)}
          onSelect={() => onSelectPlatform(platform)}
          onViewDetails={() => onViewDetails(platform)}
        />
      ))}
    </div>
  );
}
