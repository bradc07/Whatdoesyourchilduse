import type { Platform } from '../data/platforms';

interface PlatformDetailProps {
  platform: Platform;
  isSelected: boolean;
  onClose: () => void;
  onToggleSelect: () => void;
}

const riskColors = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
};

export function PlatformDetail({ platform, isSelected, onClose, onToggleSelect }: PlatformDetailProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="detail-header">
          <span className="detail-icon">{platform.icon}</span>
          <div className="detail-title">
            <h2>{platform.name}</h2>
            <div className="detail-meta">
              <span className="age-badge">Age Rating: {platform.ageRating}</span>
              <span
                className="risk-badge"
                style={{ backgroundColor: riskColors[platform.risks.level] }}
              >
                {platform.risks.level.charAt(0).toUpperCase() + platform.risks.level.slice(1)} Risk
              </span>
            </div>
          </div>
        </div>

        <p className="detail-description">{platform.description}</p>

        <div className="detail-sections">
          {/* Risks Section */}
          <section className="detail-section risks-section">
            <h3>⚠️ Key Risks to Be Aware Of</h3>
            <ul>
              {platform.risks.items.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </section>

          {/* Positives Section */}
          <section className="detail-section positives-section">
            <h3>✅ Potential Benefits</h3>
            <ul>
              {platform.positives.map((positive, index) => (
                <li key={index}>{positive}</li>
              ))}
            </ul>
          </section>

          {/* Parental Controls Section */}
          <section className="detail-section controls-section">
            <h3>🔒 Parental Controls</h3>
            {platform.parentalControls.available ? (
              <>
                <h4>Available Features:</h4>
                <ul>
                  {platform.parentalControls.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <h4>How to Set Up:</h4>
                <ol>
                  {platform.parentalControls.howToSetUp.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </>
            ) : (
              <p className="no-controls">
                This platform has limited or no built-in parental controls.
                Consider using device-level restrictions instead.
              </p>
            )}
          </section>

          {/* What to Watch Section */}
          <section className="detail-section watch-section">
            <h3>👁️ Warning Signs to Watch For</h3>
            <ul>
              {platform.whatToWatch.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Conversation Starters Section */}
          <section className="detail-section conversation-section">
            <h3>💬 Conversation Starters</h3>
            <p className="section-intro">
              Use these questions to start open, non-judgmental conversations with your child:
            </p>
            <ul className="conversation-list">
              {platform.conversationStarters.map((starter, index) => (
                <li key={index}>"{starter}"</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="detail-actions">
          <button
            className={`action-button ${isSelected ? 'remove' : 'add'}`}
            onClick={onToggleSelect}
          >
            {isSelected ? 'Remove from My Guide' : 'Add to My Guide'}
          </button>
        </div>
      </div>
    </div>
  );
}
