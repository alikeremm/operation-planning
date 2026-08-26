import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function OperationTabs({ operations, activeTab, onSelectTab }) {
  return (
    <div className="tabs-wrapper">
      <div className="tabs-container">
        {operations.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
            >
              <span>{tab.name}</span>
              <span className="tab-badge">{tab.count}</span>
            </button>
          );
        })}
      </div>

      <button type="button" className="tabs-next-btn" title="Sonraki Operasyonlar">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}