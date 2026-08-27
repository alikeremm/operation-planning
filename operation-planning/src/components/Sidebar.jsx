import React from 'react';

// İkon SVG dosyaları (src/assets/icons/)
import productTabSvg from '../assets/icons/Content (1).svg';
import orderSvg from '../assets/icons/order.svg';
import listSvg from '../assets/icons/list.svg';
import stockSvg from '../assets/icons/stock.svg';
import qualitySvg from '../assets/icons/quality.svg';
import supplySvg from '../assets/icons/Supply.svg';
import gridSvg from '../assets/icons/layout-grid-02.svg';
import truckSvg from '../assets/icons/truck-02.svg';
import flexSvg from '../assets/icons/flex.svg';
import chatSvg from '../assets/icons/_Nav item button (10).svg';
import settingsSvg from '../assets/icons/settings.svg';
import bacaLogoSvg from '../assets/icons/Baca Makine Logo.svg';

export default function Sidebar() {
  const navItems = [
    { id: 'order', icon: orderSvg, title: 'İş Emirleri & Dokümanlar' },
    { id: 'list', icon: listSvg, title: 'İş Listesi' },
    { id: 'stock', icon: stockSvg, title: 'Stok Yönetimi' },
    { id: 'quality', icon: qualitySvg, title: 'Kalite Kontrol' },
    { id: 'supply', icon: supplySvg, title: 'Tedarik ve Çevrim' },
    { id: 'grid', icon: gridSvg, title: 'İstasyon Matrisi' },
    { id: 'truck', icon: truckSvg, title: 'Sevkiyat' },
    { id: 'flex', icon: flexSvg, title: 'İş Akışı' },
  ];

  return (
    <aside className="sidebar">
      {/* 1. En Üst UPU Logosu */}
      <div className="sidebar-top-logo" title="UPU">
        <img
          src={`${import.meta.env.BASE_URL}images/logo only.png`}
          alt="UPU Logo"
          className="sidebar-logo-img"
        />
      </div>

      {/* 2. Product Sekmesi (Content (1).svg) */}
      <div className="sidebar-product-tab active" title="Product Planlama">
        <img src={productTabSvg} alt="Product" className="sidebar-product-img" />
        <div className="product-tab-underline" />
      </div>

      {/* 3. Ana Navigasyon İkonları (24x24) */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="nav-btn"
            title={item.title}
          >
            <img src={item.icon} alt={item.title} className="sidebar-icon-img" />
          </button>
        ))}
      </nav>

      {/* 4. Alt Kısım: Mesaj, Ayarlar, BACA, Profil */}
      <div className="sidebar-footer">
        {/* Mesaj / Chat Butonu */}
        <button type="button" className="nav-btn chat-btn-wrap" title="Mesajlar">
          <img src={chatSvg} alt="Mesajlar" className="sidebar-chat-img" />
        </button>

        {/* Ayarlar (24x24) */}
        <button type="button" className="nav-btn" title="Ayarlar">
          <img src={settingsSvg} alt="Ayarlar" className="sidebar-icon-img" />
        </button>

        <div className="sidebar-orange-divider" />

        {/* BACA Makine Orijinal Logosu */}
        <div className="baca-card-badge" title="BACA Makine">
          <img src={bacaLogoSvg} alt="BACA Makine" className="baca-logo-img" />
        </div>

        <div className="sidebar-orange-divider" />

        {/* Kullanıcı Avatarı */}
        <div className="sidebar-user-avatar" title="Kullanıcı Profili">
          <img
            src={`${import.meta.env.BASE_URL}images/user-profile.jpg`}
            alt="Ali Kerem"
            className="sidebar-avatar-img"
          />
        </div>
      </div>
    </aside>
  );
}


