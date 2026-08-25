import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export default function ProductCard({ product }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: product.id,
    data: { product },   //surukledigimiz urunun verisini aktariyoruz.
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="product-card"
    >
      <div className="product-card-header">
        <div className="product-info">
          <h4 className="product-title">{product.name}</h4>
          <span className="product-code">{product.code}</span>
        </div>
      </div>

      <div className="product-card-body">
        <div className="info-row">
          <span className="label">İş Emri:</span>
          <span className="value">{product.workOrder}</span>
        </div>
        <div className="info-row">
          <span className="label">Kalan:</span>
          <span className="value highlight">{product.remaining}</span>
        </div>
        <div className="info-row">
          <span className="label">Planlı:</span>
          <span className="value">{product.planned}</span>
        </div>
      </div>
    </div>
  );
}