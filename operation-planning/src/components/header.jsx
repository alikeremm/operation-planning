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
          <Search size={17} className="search-icon" />
          <input
            type="text"
            placeholder="Mamül veya İş Emri ara..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <ChevronDown size={16} className="search-chevron" />
        </div>
      </div>

      <div className="header-right">
        <button type="button" className="header-icon-btn" title="Dışa Aktar / İndir">
          <Download size={18} />
        </button>

        <button type="button" className="header-bell-btn" title="Bildirimler">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

