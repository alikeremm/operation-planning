import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

export default function PlanModal({ isOpen, onClose, draggedProduct, targetStation, onConfirmPlan }) {
  if (!isOpen || !draggedProduct || !targetStation) return null;

  const [cycleTimeWork, setCycleTimeWork] = useState('01:29');
  const [cycleTimeSetup, setCycleTimeSetup] = useState('12:24');
  const [calcType, setCalcType] = useState('duration'); // 'duration' veya 'quantity'
  const [calcValue, setCalcValue] = useState('30');
  const [plannedQty, setPlannedQty] = useState(draggedProduct.remaining || '100');
  const [isFutureDate, setIsFutureDate] = useState(false);
  const [planDate, setPlanDate] = useState('2026-08-25');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlanData = {
      id: `plan-${Date.now()}`,
      title: draggedProduct.name,
      code: draggedProduct.code,
      qty: Number(plannedQty),
      status: 'Bugün',
      cycleTimeWork,
      cycleTimeSetup,
      planDate: isFutureDate ? planDate : 'Bugün',
    };

    onConfirmPlan(targetStation.id, draggedProduct.id, newPlanData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <div className="modal-header">
          <h2>Mamül Planla</h2>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">

          <div className="match-summary-card">
            <div className="summary-item">
              <span className="summary-label">Seçilen Mamül</span>
              <strong>{draggedProduct.name}</strong>
              <small>{draggedProduct.code}</small>
            </div>

            <ArrowRight size={24} className="summary-arrow" />

            <div className="summary-item">
              <span className="summary-label">Hedef İstasyon</span>
              <strong>{targetStation.name}</strong>
              <small>{targetStation.workload} iş yükü</small>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>İş Eylemi Çevrim Süresi</label>
              <div className="input-with-unit">
                <input
                  type="text"
                  value={cycleTimeWork}
                  onChange={(e) => setCycleTimeWork(e.target.value)}
                  placeholder="00:00"
                />
                <span className="unit">dk:sn</span>
              </div>
            </div>

            <div className="form-group">
              <label>Ayar Eylemi Çevrim Süresi</label>
              <div className="input-with-unit">
                <input
                  type="text"
                  value={cycleTimeSetup}
                  onChange={(e) => setCycleTimeSetup(e.target.value)}
                  placeholder="00:00"
                />
                <span className="unit">dk:sn</span>
              </div>
            </div>
          </div>

          <div className="calculation-section">
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="calcType"
                  value="duration"
                  checked={calcType === 'duration'}
                  onChange={() => setCalcType('duration')}
                />
                Süreye Göre Miktar Hesapla
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="calcType"
                  value="quantity"
                  checked={calcType === 'quantity'}
                  onChange={() => setCalcType('quantity')}
                />
                Miktara Göre Süre Hesapla
              </label>
            </div>

            <div className="calc-input-row">
              <input
                type="number"
                value={calcValue}
                onChange={(e) => setCalcValue(e.target.value)}
                className="short-input"
              />
              <span className="calc-unit-label">{calcType === 'duration' ? 'gün' : 'adet'}</span>
              <button type="button" className="btn-secondary">Hesapla</button>
            </div>
          </div>

          <div className="form-group">
            <label>Planlanacak Miktar</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={plannedQty}
                onChange={(e) => setPlannedQty(e.target.value)}
                required
              />
              <span className="unit">ad</span>
            </div>
          </div>

          <div className="date-planning-row">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isFutureDate}
                onChange={(e) => setIsFutureDate(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
            <span>İleri Tarihe Planla</span>

            {isFutureDate && (
              <input
                type="date"
                value={planDate}
                onChange={(e) => setPlanDate(e.target.value)}
                className="date-input"
              />
            )}
          </div>

          
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Vazgeç
            </button>
            <button type="submit" className="btn-confirm">
              Planla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}