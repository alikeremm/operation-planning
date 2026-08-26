import React, { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OperationTabs from './components/OperationTabs';
import ProductCard from './components/ProductCard';
import StationRow from './components/StationRow';
import PlanModal from './components/PlanModal';

import { OPERATIONS, INITIAL_PRODUCTS, INITIAL_STATIONS } from './data/mockData';
import './styles/App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [stations, setStations] = useState(INITIAL_STATIONS);

  const [activeDragProduct, setActiveDragProduct] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    draggedProduct: null,
    targetStation: null,  
});

const filteredProducts = products.filter((item) => {
  const matchesTab = activeTab ==='all' || item.opId === activeTab;
  const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesTab && matchesSearch;
});

const handleDragStart = (event) => {
  const { active } = event;
  const draggedItem = products.find((p) => p.id === active.id);
  setActiveDragProduct(draggedItem || null);
};

const handleDragEnd = (event) => {
  const {active, over } = event;
  setActiveDragProduct(null);

  if(!over) return;

  const draggedProd = products.find((p) => p.id === active.id);
  const targetStat = stations.find((s) => s.id === over.id);

  if (draggedProd && targetStat) {
    setModalState({
      isOpen: true,
      draggedProduct: draggedProd,
      targetStation: targetStat,
    });
  }
};

  const TIMELINE_PALETTE = [
    { action: '#1d4ed8', plan: '#2563eb' }, // Mavi
    { action: '#0f766e', plan: '#0d9488' }, // Teal
    { action: '#78350f', plan: '#92400e' }, // Kahve/Altın
    { action: '#be185d', plan: '#db2777' }, // Magenta
    { action: '#7e22ce', plan: '#9333ea' }, // Mor
    { action: '#c2410c', plan: '#ea580c' }, // Turuncu
  ];

  const handleConfirmPlan = (stationId, productId, newPlanData) => {
    setStations((prevStations) =>
      prevStations.map((station) => {
        if (station.id === stationId) {
          const currentCount = (station.plannedCards || []).length;
          const colorPair = TIMELINE_PALETTE[currentCount % TIMELINE_PALETTE.length];

          const newTimelineBlock = {
            id: `block-${Date.now()}`,
            title: newPlanData.title || 'Ürün Planı',
            code: newPlanData.code || 'KOD-000',
            workOrder: '2321',
            qty: newPlanData.qty,
            actionColor: colorPair.action,
            planColor: colorPair.plan,
            setupNumber: currentCount + 1,
          };

          const totalQty = (station.plannedCards || []).reduce((sum, card) => sum + (card.qty || 0), 0) + (newPlanData.qty || 0);
          const calculatedHours = (totalQty * 0.08).toFixed(1);

          return {
            ...station,
            workload: `${calculatedHours} sa`,
            plannedCards: [...(station.plannedCards || []), newPlanData],
            timelineBlocks: [...(station.timelineBlocks || []), newTimelineBlock],
          };
        }
        return station;
      })
    );

    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        if (prod.id === productId) {
          const remainingQty = Math.max(0, prod.remaining - newPlanData.qty);
          return {
            ...prod,
            remaining: remainingQty,
            planned: prod.planned + newPlanData.qty,
          };
        }
        return prod;
      })
    );

    setModalState({ isOpen: false, draggedProduct: null, targetStation: null });
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="layout-root">
        <Sidebar />

        <div className="layout-main">
          <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <main className="content-container">
            {/* Operasyon Sekmeleri */}
            <OperationTabs
              operations={OPERATIONS}
              activeTab={activeTab}
              onSelectTab={setActiveTab}
            />

            {/* Planlanabilir Mamüller Havuzu */}
            <section className="product-pool-section">
              <div className="pool-header-row">
                <h2 className="pool-title">Planlanabilir Mamüller</h2>

                <div className="pool-stats-row">
                  <div className="pool-stat-pill">
                    <span className="pstat-lbl">Toplam İş Yükü</span>
                    <strong className="pstat-val">12.3 sa</strong>
                  </div>
                  <div className="pool-stat-pill">
                    <span className="pstat-lbl">Toplam Saat</span>
                    <strong className="pstat-val">4.2 sa</strong>
                  </div>
                  <div className="pool-stat-pill">
                    <span className="pstat-lbl">İstasyon Ort.</span>
                    <strong className="pstat-val">4.2 sa</strong>
                  </div>
                </div>
              </div>

              <div className="product-pool-scroll">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p className="no-data-text">Bu operasyona ait mamül bulunamadı.</p>
                )}
              </div>
            </section>

            {/* İstasyonlar & Planlama Çizelgesi */}
            <section className="stations-section">
              <div className="stations-section-header">
                <div className="stations-head-left">
                  <h2 className="stations-title">İstasyonlar</h2>
                  <button type="button" className="schedule-toggle-btn">
                    <span>Çizelge</span>
                    <span className="schedule-arrow">▲</span>
                  </button>
                </div>
                <div className="stations-orange-line" />
              </div>

              <div className="stations-list">
                {stations.map((station) => (
                  <StationRow key={station.id} station={station} />
                ))}
              </div>
            </section>
          </main>
        </div>

        <DragOverlay>
          {activeDragProduct ? <ProductCard product={activeDragProduct} /> : null}
        </DragOverlay>

         <PlanModal
         isOpen={modalState.isOpen}
         draggedProduct={modalState.draggedProduct}
         targetStation={modalState.targetStation}
         onClose={() => setModalState({ isOpen: false, draggedProduct: null, targetStation:null })}
         onConfirmPlan={handleConfirmPlan}
       />
     </div>
   </DndContext>
  );
}      

