import type { Platform } from '../data/platforms';

interface DashboardProps {
  selectedPlatforms: Platform[];
  onViewDetails: (platform: Platform) => void;
  onRemovePlatform: (platformId: string) => void;
}

const riskColors = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
};

export function Dashboard({ selectedPlatforms, onViewDetails, onRemovePlatform }: DashboardProps) {
  if (selectedPlatforms.length === 0) {
    return (
      <div className="dashboard-empty">
        <h2>No platforms selected</h2>
        <p>Go back and select the apps, games, and devices your child uses to get your personalised guide.</p>
      </div>
    );
  }

  const highRiskCount = selectedPlatforms.filter(p => p.risks.level === 'high').length;
  const mediumRiskCount = selectedPlatforms.filter(p => p.risks.level === 'medium').length;
  const lowRiskCount = selectedPlatforms.filter(p => p.risks.level === 'low').length;

  // Collect all conversation starters
  const allConversationStarters = selectedPlatforms.flatMap(p =>
    p.conversationStarters.slice(0, 2).map(starter => ({
      platform: p.name,
      starter
    }))
  );

  // Collect platforms without proper parental controls
  const limitedControlPlatforms = selectedPlatforms.filter(p => !p.parentalControls.available);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your Personalised Safety Guide</h2>
        <p>Based on {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} your child uses</p>
      </div>

      {/* Risk Overview */}
      <section className="dashboard-section risk-overview">
        <h3>Risk Overview</h3>
        <div className="risk-summary">
          {highRiskCount > 0 && (
            <div className="risk-stat high">
              <span className="risk-count">{highRiskCount}</span>
              <span className="risk-label">High Risk</span>
            </div>
          )}
          {mediumRiskCount > 0 && (
            <div className="risk-stat medium">
              <span className="risk-count">{mediumRiskCount}</span>
              <span className="risk-label">Medium Risk</span>
            </div>
          )}
          {lowRiskCount > 0 && (
            <div className="risk-stat low">
              <span className="risk-count">{lowRiskCount}</span>
              <span className="risk-label">Low Risk</span>
            </div>
          )}
        </div>
      </section>

      {/* Priority Actions */}
      {highRiskCount > 0 && (
        <section className="dashboard-section priority-actions">
          <h3>⚠️ Priority Actions</h3>
          <p>These platforms require immediate attention due to higher risk levels:</p>
          <div className="priority-list">
            {selectedPlatforms
              .filter(p => p.risks.level === 'high')
              .map(platform => (
                <div key={platform.id} className="priority-item">
                  <div className="priority-info">
                    <span className="priority-icon">{platform.icon}</span>
                    <span className="priority-name">{platform.name}</span>
                  </div>
                  <button
                    className="priority-action"
                    onClick={() => onViewDetails(platform)}
                  >
                    Set Up Controls →
                  </button>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Platforms Without Controls */}
      {limitedControlPlatforms.length > 0 && (
        <section className="dashboard-section no-controls-warning">
          <h3>🔓 Platforms Without Built-in Controls</h3>
          <p>These platforms have limited parental controls. Consider device-level restrictions:</p>
          <ul>
            {limitedControlPlatforms.map(platform => (
              <li key={platform.id}>
                {platform.icon} {platform.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Selected Platforms List */}
      <section className="dashboard-section platforms-list">
        <h3>Your Child's Platforms</h3>
        <div className="dashboard-platforms">
          {selectedPlatforms.map(platform => (
            <div key={platform.id} className="dashboard-platform-card">
              <div className="dpc-header">
                <span className="dpc-icon">{platform.icon}</span>
                <div className="dpc-info">
                  <h4>{platform.name}</h4>
                  <span className="dpc-age">Age: {platform.ageRating}</span>
                </div>
                <span
                  className="dpc-risk"
                  style={{ backgroundColor: riskColors[platform.risks.level] }}
                >
                  {platform.risks.level}
                </span>
              </div>
              <div className="dpc-actions">
                <button onClick={() => onViewDetails(platform)}>View Guide</button>
                <button className="remove-btn" onClick={() => onRemovePlatform(platform.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conversation Starters */}
      <section className="dashboard-section conversations">
        <h3>💬 Start the Conversation</h3>
        <p>Here are some questions to help you talk with your child:</p>
        <div className="conversation-cards">
          {allConversationStarters.slice(0, 6).map((item, index) => (
            <div key={index} className="conversation-card">
              <span className="cc-platform">{item.platform}</span>
              <p>"{item.starter}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Tips */}
      <section className="dashboard-section quick-tips">
        <h3>📚 General Safety Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Keep Devices in Common Areas</h4>
            <p>Encourage device use in shared spaces where you can casually observe.</p>
          </div>
          <div className="tip-card">
            <h4>Set Clear Expectations</h4>
            <p>Establish rules together about screen time, appropriate content, and online behaviour.</p>
          </div>
          <div className="tip-card">
            <h4>Stay Curious, Not Critical</h4>
            <p>Show genuine interest in what they enjoy online without immediate judgement.</p>
          </div>
          <div className="tip-card">
            <h4>Create a Safe Space</h4>
            <p>Let them know they can come to you if something makes them uncomfortable.</p>
          </div>
        </div>
      </section>

      {/* Print/Save Option */}
      <div className="dashboard-footer">
        <button className="print-button" onClick={() => window.print()}>
          🖨️ Print This Guide
        </button>
      </div>
    </div>
  );
}
