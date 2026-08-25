import React from "react";

export default function OperationTabs({operations, activeTab, onSelectTab}) {
    return (
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
  );
}