import React from 'react';
import { Search, ChevronDown, Download, Bell } from 'lucide-react';

export default function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="main-header">
      <div className="header-left">
        <h1 className="header-title">Planlama</h1>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder=""
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          <div className="search-dropdown-trigger">
            <ChevronDown size={17} />
          </div>
        </div>
      </div>

      <div className="header-right">
        <button type="button" className="header-icon-btn" title="Dışa Aktar">
          <Download size={18} />
        </button>

        <button type="button" className="header-bell-btn" title="Bildirimler">
          <Bell size={18} fill="#ffffff" color="#ffffff" />
        </button>
      </div>
    </header>
  );
}

