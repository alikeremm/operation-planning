import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal, HelpCircle } from 'lucide-react';

// Temiz vektörel Dişli SVG İkonu
const GearIconSvg = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="6" fill="#F2F4F7" />
    <g transform="translate(20,20)" fill="#475467">
      <path d="M0 -15 L3 -15 L4 -11 A11 11 0 0 1 8 -9 L12 -11 L14 -9 L12 -5 A11 11 0 0 1 13 0 L17 1 L17 3 L13 4 A11 11 0 0 1 12 9 L14 13 L12 15 L8 13 A11 11 0 0 1 4 15 L3 19 L-3 19 L-4 15 A11 11 0 0 1 -8 13 L-12 15 L-14 13 L-12 9 A11 11 0 0 1 -13 4 L-17 3 L-17 1 L-13 0 A11 11 0 0 1 -12 -5 L-14 -9 L-12 -11 L-8 -9 A11 11 0 0 1 -4 -11 Z" />
      <circle cx="0" cy="0" r="5.5" fill="#F2F4F7" />
      <circle cx="0" cy="0" r="3" fill="#344054" />
    </g>
  </svg>
);

export default function ProductCard({ product }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: product.id,
    data: { product },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.45 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="figma-product-card"
    >
      {/* Kart Üst Başlık & İkon */}
      <div className="figma-pcard-header">
        <div className="figma-pcard-thumb-wrap">
          <div className="figma-pcard-green-badge" />
          <GearIconSvg />
        </div>

        <div className="figma-pcard-meta">
          <div className="figma-pcard-title-row">
            <h4 className="figma-pcard-title" title={product.name}>
              {product.name}
            </h4>
            <button type="button" className="figma-pcard-dots">
              <MoreHorizontal size={15} />
            </button>
          </div>
          <span className="figma-pcard-code">{product.code}</span>
        </div>
      </div>

      {/* Kart Orta Tablo Grid */}
      <div className="figma-pcard-grid">
        <div className="figma-pcard-cell">
          <div className="figma-pcell-label">
            <span>Önc. Hazır</span>
            <HelpCircle size={10} className="figma-pcell-ico" />
          </div>
          <span className="figma-pcell-val">9999999</span>
        </div>

        <div className="figma-pcard-cell">
          <div className="figma-pcell-label">
            <span>İş Emri</span>
          </div>
          <span className="figma-pcell-val">{product.workOrder || '123435'}</span>
        </div>

        <div className="figma-pcard-cell figma-pcell-badge-col">
          <div className="figma-pcell-vert-tag">İş Emri</div>
          <div className="figma-pcell-lines">
            <div className="figma-pcell-row">
              <span className="figma-pcell-sublbl">Kalan</span>
              <span className="figma-pcell-num">{product.remaining}</span>
            </div>
            <div className="figma-pcell-row">
              <span className="figma-pcell-sublbl">Planlı</span>
              <span className="figma-pcell-num">{product.planned}</span>
            </div>
          </div>
        </div>

        <div className="figma-pcard-vert-hdr">
          <span>Y. Mamül (ad)</span>
        </div>
      </div>

      {/* Kart Alt İş Yükü Çubuğu */}
      <div className="figma-pcard-footer">
        <span className="figma-pcard-load-lbl">İş Yükü</span>
        <div className="figma-pcard-load-pill">
          <span className="figma-load-item">Planlı <strong className="figma-load-val">0.0 sa</strong></span>
        </div>
        <div className="figma-pcard-load-pill">
          <span className="figma-load-item">Kalan <strong className="figma-load-val">4.2 sa</strong></span>
        </div>
      </div>
    </div>
  );
}