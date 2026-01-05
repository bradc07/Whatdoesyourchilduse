import type { Platform } from '../data/platforms';

interface PlatformCardProps {
  platform: Platform;
  isSelected: boolean;
  onSelect: () => void;
  onViewDetails: () => void;
}

const riskColors = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
};

const categoryLabels = {
  social: 'Social Media',
  gaming: 'Game',
  streaming: 'Streaming',
  messaging: 'Messaging',
  device: 'Device',
};

export function PlatformCard({ platform, isSelected, onSelect, onViewDetails }: PlatformCardProps) {
  return (
    <div className={`platform-card ${isSelected ? 'selected' : ''}`}>
      <div className="card-header">
        <div className="card-checkbox">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            id={`checkbox-${platform.id}`}
          />
          <label htmlFor={`checkbox-${platform.id}`} className="checkbox-label">
            <span className="sr-only">Select {platform.name}</span>
          </label>
        </div>
        <span className="platform-icon">{platform.icon}</span>
      </div>

      <div className="card-content">
        <h3 className="platform-name">{platform.name}</h3>
        <span className="platform-category">{categoryLabels[platform.category]}</span>

        <div className="card-meta">
          <span className="age-rating">Age: {platform.ageRating}</span>
          <span
            className="risk-indicator"
            style={{ backgroundColor: riskColors[platform.risks.level] }}
          >
            {platform.risks.level} risk
          </span>
        </div>
      </div>

      <button className="view-details-button" onClick={onViewDetails}>
        View Guidance →
      </button>
    </div>
  );
}
