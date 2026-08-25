import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';

export default function StationRow({ station }) {
  
  const { setNodeRef, isOver } = useDroppable({
    id: station.id,
    data: { station }, 
  });

  return (
    <div className="station-row">
      {/* Sol Makine Bilgi Kutusu */}
      <div className="station-info-card">
        <h3 className="station-name">{station.name}</h3>
        <div className="station-workload">
          <span>İş Yükü:</span>
          <strong>{station.workload}</strong>
        </div>
      </div>

      
      <div className="station-content">
        
        <div className="station-cards-container">
          
          {station.plannedCards.map((card) => (
            <div key={card.id} className="planned-card">
              <div className="planned-card-header">
                <span className="planned-title">{card.title}</span>
                <span className="planned-status">{card.status}</span>
              </div>
              <div className="planned-card-body">
                <div>Kod: {card.code}</div>
                <div>Planlanan Miktar: <strong>{card.qty}</strong></div>
              </div>
            </div>
          ))}

          
          <div
            ref={setNodeRef}
            className={`drop-zone ${isOver ? 'drop-zone-active' : ''}`}
          >
            <Plus size={24} className="drop-icon" />
            <span>Planlamak için Sürükle & Bırak</span>
          </div>
        </div>

        
        {station.timelineBlocks && station.timelineBlocks.length > 0 && (
          <div className="timeline-bar">
            {station.timelineBlocks.map((block) => (
              <div
                key={block.id}
                className="timeline-block"
                style={{ backgroundColor: block.color }}
                title={`${block.title} (${block.label})`}
              >
                <span className="timeline-time">{block.label}</span>
                <span className="timeline-title">{block.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}