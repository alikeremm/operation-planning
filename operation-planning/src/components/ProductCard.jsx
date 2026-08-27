import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal, HelpCircle } from 'lucide-react';

// Helis Dişli SVG İkonu
import helisDisliSvg from '../assets/icons/helis disli.svg';

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
          <img src={helisDisliSvg} alt="Helis Dişli" className="figma-pcard-gear-img" />
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