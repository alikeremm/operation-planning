import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Plus, MoreHorizontal, ChevronDown, ChevronUp, Wrench, Play } from 'lucide-react';

// Temiz vektörel CNC Tezgah SVG İkonu
const CncMachineSvg = () => (
  <svg width="44" height="34" viewBox="0 0 50 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="38" rx="4" fill="#E2E8F0" />
    <rect x="5" y="6" width="40" height="26" rx="2" fill="#334155" />
    <rect x="9" y="9" width="18" height="16" rx="1" fill="#64748B" />
    <rect x="11" y="11" width="14" height="12" rx="1" fill="#CBD5E1" opacity="0.6" />
    <rect x="30" y="9" width="12" height="8" rx="1" fill="#0284C7" opacity="0.9" />
    <circle cx="33" cy="24" r="1.8" fill="#EF4444" />
    <circle cx="39" cy="24" r="1.8" fill="#22C55E" />
    <rect x="7" y="32" width="36" height="2" fill="#0F172A" />
  </svg>
);

// Temiz Dişli SVG
const SmallGearSvg = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="4" fill="#F2F4F7" />
    <g transform="translate(20,20)" fill="#475467">
      <path d="M0 -15 L3 -15 L4 -11 A11 11 0 0 1 8 -9 L12 -11 L14 -9 L12 -5 A11 11 0 0 1 13 0 L17 1 L17 3 L13 4 A11 11 0 0 1 12 9 L14 13 L12 15 L8 13 A11 11 0 0 1 4 15 L3 19 L-3 19 L-4 15 A11 11 0 0 1 -8 13 L-12 15 L-14 13 L-12 9 A11 11 0 0 1 -13 4 L-17 3 L-17 1 L-13 0 A11 11 0 0 1 -12 -5 L-14 -9 L-12 -11 L-8 -9 A11 11 0 0 1 -4 -11 Z" />
      <circle cx="0" cy="0" r="5" fill="#F2F4F7" />
      <circle cx="0" cy="0" r="2.5" fill="#344054" />
    </g>
  </svg>
);

export default function StationRow({ station }) {
  const [showTimeline, setShowTimeline] = useState(true);

  const { setNodeRef, isOver } = useDroppable({
    id: station.id,
    data: { station },
  });

  const isDemoStation = station.id === 'station-1' || station.isDemo;

  // Demo kartlar (İstasyon 1 için)
  const demoCards = [
    {
      id: 'demo-c1',
      order: 1,
      date: '26/08/26 18:08',
      status: 'Tamamlandı',
      title: 'Helis Dişli Z:15 MN:6DP...',
      code: '600.01.0216 / 16.Op (CTRN)',
      plannedQty: 123435,
      doneQty: 123435,
      remQty: 123435,
    },
    {
      id: 'demo-c2',
      order: 1,
      date: '26/08/26 18:08',
      status: 'Bugün',
      title: 'Helis Dişli Z:15 MN:6DP...',
      code: '600.01.0216 / 16.Op (CTRN)',
      plannedQty: 123435,
      doneQty: 123435,
      remQty: 123435,
    },
  ];

  return (
    <div className="figma-station-row">
      {/* SOL: Tezgah Bilgi Kolonu */}
      <div className="figma-st-sidebar">
        {/* Başlık ve Üç Nokta */}
        <div className="figma-st-head">
          <h3 className="figma-st-title">{station.name || 'GOODWAY GLS-200'}</h3>
          <button type="button" className="figma-st-dots">
            <MoreHorizontal size={15} />
          </button>
        </div>

        {/* Tezgah Görseli ve Boşluklar */}
        <div className="figma-st-machine-box">
          <div className="figma-st-machine-thumb">
            <CncMachineSvg />
          </div>
          <div className="figma-st-space-info">
            <span className="figma-st-space-lbl">Boşluklar</span>
            <span className="figma-st-space-val">
              {isDemoStation ? '25 gün' : station.plannedCards.length > 0 ? '5 gün' : 'Boş'}
            </span>
          </div>
        </div>

        {/* İş Yükü Kutusu */}
        <div className="figma-st-workload-box">
          <div className="figma-st-wl-head">İş Yükü</div>
          <div className="figma-st-wl-body">
            <span className="figma-st-wl-days">{isDemoStation ? '25 gün' : `${station.plannedCards.length} İş`}</span>
            <span className="figma-st-wl-hours">{station.workload || '0.0 sa'}</span>
          </div>
        </div>

        {/* Zaman Çizelgesi Akordiyon Butonu */}
        <button
          type="button"
          className="figma-st-timeline-toggle"
          onClick={() => setShowTimeline(!showTimeline)}
        >
          <span>Zaman Çizelgesi</span>
          {showTimeline ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        {/* Çizelge Sol Başlıkları (Gerçekleşen & Planlanan) */}
        {showTimeline && (
          <div className="figma-st-timeline-labels">
            <div className="figma-st-action-tag">Eylem</div>
            <div className="figma-st-label-rows">
              <div className="figma-st-lbl-row">Gerçekleşen</div>
              <div className="figma-st-lbl-row">Planlanan</div>
            </div>
          </div>
        )}
      </div>

      {/* SAĞ: Planlanan Kartlar & Gantt Çizelgesi */}
      <div className="figma-st-content">
        {/* ÜST: Planlanan Kartlar + Sürükle Bırak Bırakma Alanı */}
        <div className="figma-st-cards-row">
          {/* İSTASYON 1: Sabit Demo Kartlar */}
          {isDemoStation &&
            demoCards.map((card, idx) => (
              <div key={card.id || idx} className="figma-st-planned-card">
                <div className="figma-planned-head">
                  <span className="figma-planned-order">{idx + 1}.</span>
                  <span className="figma-planned-date">{card.date}</span>
                  <span className="figma-planned-status">{card.status}</span>
                </div>
                <div className="figma-planned-body">
                  <div className="figma-planned-top-info">
                    <div className="figma-planned-thumb-wrap">
                      <div className="figma-planned-green-tag" />
                      <SmallGearSvg />
                    </div>
                    <div className="figma-planned-title-col">
                      <div className="figma-planned-name-row">
                        <h5 className="figma-planned-title" title={card.title}>
                          {card.title}
                        </h5>
                        <button type="button" className="figma-planned-dots">
                          <MoreHorizontal size={13} />
                        </button>
                      </div>
                      <span className="figma-planned-code">{card.code}</span>
                    </div>
                  </div>
                  <div className="figma-planned-matrix">
                    <div className="figma-matrix-cell">
                      <span className="figma-mcell-lbl">Planlanan</span>
                      <span className="figma-mcell-val">{card.plannedQty}</span>
                    </div>
                    <div className="figma-matrix-cell">
                      <span className="figma-mcell-lbl">Yapılan</span>
                      <span className="figma-mcell-val">{card.doneQty}</span>
                    </div>
                    <div className="figma-matrix-cell">
                      <span className="figma-mcell-lbl">Kalan</span>
                      <span className="figma-mcell-val">{card.remQty}</span>
                    </div>
                    <div className="figma-matrix-vert">
                      <span>Y. Mamül (ad)</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* DİĞER İSTASYONLAR: Dinamik Olarak Eklenen Kartlar */}
          {station.plannedCards &&
            station.plannedCards.map((card, idx) => (
              <div key={card.id || idx} className="figma-st-planned-card">
                <div className="figma-planned-head">
                  <span className="figma-planned-order">{idx + 1}.</span>
                  <span className="figma-planned-date">26/08/26 18:08</span>
                  <span className="figma-planned-status">{card.status || 'Bugün'}</span>
                </div>
                <div className="figma-planned-body">
                  <div className="figma-planned-top-info">
                    <div className="figma-planned-thumb-wrap">
                      <div className="figma-planned-green-tag" />
                      <SmallGearSvg />
                    </div>
                    <div className="figma-planned-title-col">
                      <div className="figma-planned-name-row">
                        <h5 className="figma-planned-title" title={card.title}>
                          {card.title}
                        </h5>
                        <button type="button" className="figma-planned-dots">
                          <MoreHorizontal size={13} />
                        </button>
                      </div>
                      <span className="figma-planned-code">{card.code}</span>
                    </div>
                  </div>
                  <div className="figma-planned-matrix">
                    <div className="figma-matrix-cell">
                      <span className="figma-mcell-lbl">Planlanan</span>
                      <span className="figma-mcell-val">{card.qty}</span>
                    </div>
                    <div className="figma-matrix-cell">
                      <span className="figma-mcell-lbl">Yapılan</span>
                      <span className="figma-mcell-val">0</span>
                    </div>
                    <div className="figma-matrix-cell">
                      <span className="figma-mcell-lbl">Kalan</span>
                      <span className="figma-mcell-val">{card.qty}</span>
                    </div>
                    <div className="figma-matrix-vert">
                      <span>Y. Mamül (ad)</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Sürükle Bırak Bırakma Alanı */}
          <div
            ref={setNodeRef}
            className={`figma-st-dropzone ${isOver ? 'figma-dropzone-active' : ''}`}
          >
            <Plus size={26} className="figma-drop-plus" />
            <span className="figma-drop-text">Planlamak için Sürükle & Bırak</span>
          </div>
        </div>

        {/* ALT: Gantt Çizelgesi */}
        {showTimeline && (
          <div className="figma-gantt-container">
            {/* Saat Dilimleri Başlığı */}
            <div className="figma-gantt-timeline-header">
              <div className="figma-gantt-tick figma-tick-purple">08:00 10:00</div>
              <div className="figma-gantt-tick figma-tick-lpurple">10:10 12:30</div>
              <div className="figma-gantt-tick figma-tick-sky">13:10 15:00</div>
              <div className="figma-gantt-tick figma-tick-blue">15:10 18:30</div>
              <div className="figma-gantt-tick figma-tick-orange">19:30 21:00</div>
              <div className="figma-gantt-tick figma-tick-dorange">21:10 00:30</div>
              <div className="figma-gantt-tick figma-tick-slate">00:30 08:00</div>
            </div>

            {/* İSTASYON 1: Zengin Demo Çizelge */}
            {isDemoStation ? (
              <>
                <div className="figma-gantt-row figma-gantt-actual-row">
                  <div className="figma-gantt-wrench-block">
                    <Wrench size={10} /> <span>1</span>
                  </div>
                  <div className="figma-gantt-action-block figma-block-teal">
                    <Play size={9} fill="#fff" /> <span>Kutup İçi Manivela</span>
                  </div>

                  <div className="figma-gantt-wrench-block">
                    <Wrench size={10} /> <span>1</span>
                  </div>
                  <div className="figma-gantt-action-block figma-block-blue">
                    <Play size={9} fill="#fff" /> <span>Hareket İletim Mili</span>
                  </div>

                  <div className="figma-gantt-wrench-block">
                    <Wrench size={10} /> <span>1</span>
                  </div>
                  <div className="figma-gantt-action-block figma-block-brown">
                    <Play size={9} fill="#fff" /> <span>36KV RMU Vakum Tüpü Hareket Ma...</span>
                  </div>

                  <div className="figma-gantt-wrench-block">
                    <Wrench size={10} /> <span>1</span>
                  </div>
                  <div className="figma-gantt-action-block figma-block-magenta">
                    <Play size={9} fill="#fff" /> <span>Kapasitif Mesnet Sacı</span>
                  </div>
                </div>

                <div className="figma-gantt-row figma-gantt-planned-row">
                  <div className="figma-gantt-plan-block figma-pblock-teal">
                    <span className="figma-pblock-code">2321</span>
                    <span>Kutup İçi Manivela</span>
                  </div>

                  <div className="figma-gantt-plan-block figma-pblock-blue">
                    <span className="figma-pblock-code">2321</span>
                    <span>Hareket İletim Mili</span>
                  </div>

                  <div className="figma-gantt-plan-block figma-pblock-brown">
                    <span className="figma-pblock-code">2321</span>
                    <span>36KV RMU Vakum Tüp...</span>
                  </div>

                  <div className="figma-gantt-plan-block figma-pblock-magenta">
                    <span className="figma-pblock-code">2321</span>
                    <span>Kapasitif Mesnet Sacı</span>
                  </div>
                </div>
              </>
            ) : station.timelineBlocks && station.timelineBlocks.length > 0 ? (
              /* DİĞER İSTASYONLAR: Eklenen Ürünlere Göre Oluşan Dinamik Çizelge */
              <>
                <div className="figma-gantt-row figma-gantt-actual-row">
                  {station.timelineBlocks.map((block, i) => (
                    <React.Fragment key={block.id || i}>
                      <div className="figma-gantt-wrench-block">
                        <Wrench size={10} /> <span>{block.setupNumber || i + 1}</span>
                      </div>
                      <div
                        className="figma-gantt-action-block"
                        style={{ backgroundColor: block.actionColor || '#1d4ed8' }}
                      >
                        <Play size={9} fill="#fff" /> <span>{block.title}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                <div className="figma-gantt-row figma-gantt-planned-row">
                  {station.timelineBlocks.map((block, i) => (
                    <div
                      key={block.id || i}
                      className="figma-gantt-plan-block"
                      style={{ backgroundColor: block.planColor || '#2563eb' }}
                    >
                      <span className="figma-pblock-code">{block.workOrder || '2321'}</span>
                      <span>{block.title}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Henüz İş Eklenmemiş İstasyonlar İçin Sade ve Temiz Durum */
              <div className="figma-gantt-empty-track">
                <span className="figma-empty-track-text">
                  Bu istasyona henüz iş planlanmadı. Yukarıdaki alana mamül sürükleyip bıraktığınızda zaman çizelgesine eklenecektir.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
