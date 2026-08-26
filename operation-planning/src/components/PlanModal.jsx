import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  Play,
  Wrench,
  Target,
  BarChart2,
  Calendar,
  MoreHorizontal,
  HelpCircle
} from 'lucide-react';

// Gear and Machine SVG placeholders if not passed from product/station
const GEAR_THUMB = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='gGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2364748b'/%3E%3Cstop offset='100%25' stop-color='%231e293b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='80' height='80' rx='6' fill='%23eaecf0'/%3E%3Cg transform='translate(40,40)' fill='url(%23gGrad)'%3E%3Cpath d='M0 -28 L5 -28 L6 -20 A20 20 0 0 1 15 -16 L22 -20 L25 -17 L21 -10 A20 20 0 0 1 24 0 L32 2 L32 6 L24 8 A20 20 0 0 1 21 18 L25 25 L22 28 L15 24 A20 20 0 0 1 6 28 L5 36 L-5 36 L-6 28 A20 20 0 0 1 -15 24 L-22 28 L-25 25 L-21 18 A20 20 0 0 1 -24 8 L-32 6 L-32 2 L-24 0 A20 20 0 0 1 -21 -10 L-25 -17 L-22 -20 L-15 -16 A20 20 0 0 1 -6 -20 Z'/%3Ccircle cx='0' cy='0' r='10' fill='%23eaecf0'/%3E%3Ccircle cx='0' cy='0' r='6' fill='%23334155'/%3E%3C/g%3E%3C/svg%3E";
const CNC_THUMB = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 75'%3E%3Crect width='100' height='75' rx='6' fill='%23f1f5f9'/%3E%3Crect x='10' y='12' width='80' height='50' rx='4' fill='%23334155'/%3E%3Crect x='18' y='18' width='38' height='34' rx='2' fill='%2364748b'/%3E%3Crect x='22' y='22' width='30' height='26' rx='1' fill='%23cbd5e1' opacity='0.7'/%3E%3Crect x='62' y='18' width='22' height='16' rx='2' fill='%230284c7' opacity='0.8'/%3E%3Ccircle cx='68' cy='46' r='3' fill='%23ef4444'/%3E%3Ccircle cx='78' cy='46' r='3' fill='%2322c55e'/%3E%3Crect x='14' y='62' width='72' height='4' fill='%230f172a'/%3E%3C/svg%3E";
const USER_AVATAR = `${import.meta.env.BASE_URL}images/user-profile.jpg`;

export default function PlanModal({ isOpen, onClose, draggedProduct, targetStation, onConfirmPlan }) {
  if (!isOpen || !draggedProduct || !targetStation) return null;

  const [cycleTimeWork, setCycleTimeWork] = useState('01 : 29');
  const [cycleTimeSetup, setCycleTimeSetup] = useState('12 : 24');
  const [calcType, setCalcType] = useState('duration');
  const [calcValue, setCalcValue] = useState('30');
  const [plannedQty, setPlannedQty] = useState(draggedProduct.remaining || '200');
  const [isFutureDate, setIsFutureDate] = useState(true);
  const [planDate, setPlanDate] = useState('2026-08-26');

  // Calculation display states
  const [startDate, setStartDate] = useState('--');
  const [endDate, setEndDate] = useState('26.08.2026');
  const [totalDuration, setTotalDuration] = useState('1 gün 23 sa 16 dk');

  const handleCalculate = () => {
    if (calcType === 'duration') {
      setEndDate('26.09.2026');
      setTotalDuration(`${calcValue} gün 0 sa 0 dk`);
    } else {
      setEndDate('26.08.2026');
      setTotalDuration(`1 gün 23 sa 16 dk`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlanData = {
      id: `plan-${Date.now()}`,
      title: draggedProduct.name || 'Helis Dişli Z:15 MN:6DP...',
      code: draggedProduct.code || '600.01.0216 / 16.Op (CTRN)',
      qty: Number(plannedQty),
      status: 'Bugün',
      cycleTimeWork,
      cycleTimeSetup,
      planDate: isFutureDate ? planDate : 'Bugün',
    };

    onConfirmPlan(targetStation.id, draggedProduct.id, newPlanData);
  };

  return (
    <div className="figma-modal-backdrop" onClick={onClose}>
      <div className="figma-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* ==================================================================
            1. MODAL HEADER
            ================================================================== */}
        <div className="figma-modal-header">
          <h2 className="figma-modal-title">Mamül Planla</h2>

          <div className="figma-modal-header-right">
            {/* User Profile Pill */}
            <div className="figma-user-pill">
              <img
                src={USER_AVATAR}
                alt="Ali Kerem"
                className="figma-user-pill-avatar"
              />
              <div className="figma-user-pill-text">
                <span className="figma-user-pill-name">Ali Kerem</span>
                <span className="figma-user-pill-date">Düzenlendi 26.08.2026 18:08</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              className="figma-modal-close-btn"
              onClick={onClose}
              title="Kapat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="figma-modal-form">
          {/* ==================================================================
              2. SOURCE PRODUCT -> TARGET STATION MATCH SECTION
              ================================================================== */}
          <div className="figma-match-section">
            {/* Left: Product Card Preview */}
            <div className="figma-prod-card-wrap">
              <div className="figma-prod-card-inner">
                <div className="figma-prod-card-top">
                  <div className="figma-prod-thumb-box">
                    <div className="figma-green-tag" />
                    <img src={GEAR_THUMB} alt="Mamül" className="figma-prod-thumb-img" />
                  </div>

                  <div className="figma-prod-info-col">
                    <div className="figma-prod-info-head">
                      <h4 className="figma-prod-name">
                        {draggedProduct.fullName || draggedProduct.name || 'Helis Dişli Z:15 MN:6DP...'}
                      </h4>
                      <button type="button" className="figma-card-dots-btn">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <span className="figma-prod-code-badge">
                      {draggedProduct.code || '600.01.0216 / 16.Op (CTRN)'}
                    </span>
                  </div>
                </div>

                {/* Metrics Table Grid */}
                <div className="figma-prod-grid">
                  <div className="figma-grid-cell">
                    <div className="figma-cell-lbl">
                      <span>Önc. Hazır</span>
                      <HelpCircle size={11} className="figma-help-ico" />
                    </div>
                    <span className="figma-cell-val">9999999</span>
                  </div>

                  <div className="figma-grid-cell">
                    <div className="figma-cell-lbl">
                      <span>İş Emri</span>
                    </div>
                    <span className="figma-cell-val">{draggedProduct.workOrder || '123435'}</span>
                  </div>

                  <div className="figma-grid-cell figma-cell-badge-col">
                    <div className="figma-vert-tag">İş Emri</div>
                    <div className="figma-badge-lines">
                      <div className="figma-line-row">
                        <span className="figma-line-lbl">Kalan</span>
                        <span className="figma-line-val">{draggedProduct.remaining || '700'}</span>
                      </div>
                      <div className="figma-line-row">
                        <span className="figma-line-lbl">Planlı</span>
                        <span className="figma-line-val">{draggedProduct.planned || '500'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="figma-grid-vert-label">
                    <span>Y. Mamül (ad)</span>
                  </div>
                </div>
              </div>

              {/* Order Date Pill */}
              <div className="figma-order-date-pill">
                <span className="figma-order-date-lbl">En Yakın Sipariş</span>
                <span className="figma-order-date-val">26.08.2026 - 14.000 ad</span>
              </div>
            </div>

            {/* Match Arrow */}
            <div className="figma-match-arrow-wrap">
              <ArrowRight size={22} className="figma-match-arrow" />
            </div>

            {/* Right: Target Machine */}
            <div className="figma-station-card-wrap">
              <div className="figma-station-thumb-box">
                <img src={CNC_THUMB} alt="Tezgah" className="figma-station-thumb-img" />
              </div>
              <div className="figma-station-info-col">
                <h3 className="figma-station-name">{targetStation.name || 'Hummer T-42 CL'}</h3>
                <span className="figma-station-type-badge">{targetStation.type || 'CNC Dişli'}</span>
              </div>
            </div>
          </div>

          {/* ==================================================================
              3. CYCLE TIME CONFIGURATION (2 COLUMNS)
              ================================================================== */}
          <div className="figma-cycle-times-row">
            {/* Column 1: İş Eylemi Çevrim Süresi */}
            <div className="figma-cycle-col">
              <div className="figma-cycle-head">
                <div className="figma-cycle-icon-badge">
                  <Play size={14} fill="#101828" color="#101828" />
                </div>
                <h4 className="figma-cycle-title">İş Eylemi Çevrim Süresi</h4>
              </div>

              <div className="figma-cycle-badges">
                <div className="figma-cycle-pill figma-pill-target">
                  <span className="figma-pill-lbl">Hedef</span>
                  <Target size={13} className="figma-pill-ico" />
                  <span className="figma-pill-val">01:29</span>
                </div>

                <div className="figma-cycle-pill figma-pill-avg">
                  <span className="figma-pill-lbl">Ortalama</span>
                  <BarChart2 size={13} className="figma-pill-ico-green" />
                  <span className="figma-pill-val">01:26</span>
                </div>
              </div>

              <div className="figma-form-group">
                <label className="figma-input-label">Planlanacak Çevrim Süresi</label>
                <div className="figma-input-unit-wrap">
                  <input
                    type="text"
                    value={cycleTimeWork}
                    onChange={(e) => setCycleTimeWork(e.target.value)}
                    className="figma-unit-input"
                  />
                  <span className="figma-unit-suffix">dk:sn</span>
                </div>
                <span className="figma-input-hint">Girilen süre sadece bu planlama için geçerlidir</span>
              </div>
            </div>

            {/* Column 2: Ayar Eylemi Çevrim Süresi */}
            <div className="figma-cycle-col">
              <div className="figma-cycle-head">
                <div className="figma-cycle-icon-badge">
                  <Wrench size={14} color="#101828" strokeWidth={2.4} />
                </div>
                <h4 className="figma-cycle-title">Ayar Eylemi Çevrim Süresi</h4>
              </div>

              <div className="figma-cycle-badges">
                <div className="figma-cycle-pill figma-pill-target">
                  <span className="figma-pill-lbl">Hedef</span>
                  <Target size={13} className="figma-pill-ico" />
                  <span className="figma-pill-val">01:29</span>
                </div>

                <div className="figma-cycle-pill figma-pill-avg">
                  <span className="figma-pill-lbl">Ortalama</span>
                  <BarChart2 size={13} className="figma-pill-ico-green" />
                  <span className="figma-pill-val">01:26</span>
                </div>
              </div>

              <div className="figma-form-group">
                <label className="figma-input-label">Planlanacak Çevrim Süresi</label>
                <div className="figma-input-unit-wrap">
                  <input
                    type="text"
                    value={cycleTimeSetup}
                    onChange={(e) => setCycleTimeSetup(e.target.value)}
                    className="figma-unit-input"
                  />
                  <span className="figma-unit-suffix">dk:sn</span>
                </div>
                <span className="figma-input-hint">Girilen süre sadece bu planlama için geçerlidir</span>
              </div>
            </div>
          </div>

          {/* ==================================================================
              4. MİKTAR / SÜRE HESAPLA SECTION
              ================================================================== */}
          <div className="figma-calc-section">
            <div className="figma-calc-head">
              <h4 className="figma-calc-title">Miktar / Süre Hesapla</h4>
              <span className="figma-calc-badge">Zorunlu Değil (Sadece hesaplama için kullanılır)</span>
            </div>

            <div className="figma-calc-controls-row">
              <label className="figma-radio-label">
                <input
                  type="radio"
                  name="calcType"
                  value="duration"
                  checked={calcType === 'duration'}
                  onChange={() => setCalcType('duration')}
                  className="figma-radio-input"
                />
                <span>Süreye Göre Miktar Hesapla</span>
              </label>

              <label className="figma-radio-label">
                <input
                  type="radio"
                  name="calcType"
                  value="quantity"
                  checked={calcType === 'quantity'}
                  onChange={() => setCalcType('quantity')}
                  className="figma-radio-input"
                />
                <span>Miktara Göre Süre Hesapla</span>
              </label>

              <ArrowRight size={18} className="figma-calc-arrow" />

              <div className="figma-calc-input-box">
                <input
                  type="text"
                  value={calcValue}
                  onChange={(e) => setCalcValue(e.target.value)}
                  className="figma-calc-val-input"
                />
                <span className="figma-calc-unit-text">{calcType === 'duration' ? 'gün' : 'ad'}</span>
              </div>

              <button
                type="button"
                className="figma-btn-calc"
                onClick={handleCalculate}
              >
                Hesapla
              </button>
            </div>

            {/* Results Grid (3 Columns) */}
            <div className="figma-calc-results-grid">
              <div className="figma-calc-result-box">
                <div className="figma-result-box-head">Başlangıç</div>
                <div className="figma-result-box-val">{startDate}</div>
              </div>

              <div className="figma-calc-result-box">
                <div className="figma-result-box-head">Bitiş</div>
                <div className="figma-result-box-val">{endDate}</div>
              </div>

              <div className="figma-calc-result-box">
                <div className="figma-result-box-head">Toplam Süre</div>
                <div className="figma-result-box-val">{totalDuration}</div>
              </div>
            </div>
          </div>

          {/* ==================================================================
              5. QUANTITY AND FUTURE DATE PLANNING
              ================================================================== */}
          <div className="figma-bottom-inputs-section">
            {/* Row 1: Planlanacak Miktar */}
            <div className="figma-bottom-row">
              <label className="figma-bottom-label">Planlanacak Miktar</label>
              <div className="figma-qty-input-wrap">
                <input
                  type="number"
                  value={plannedQty}
                  onChange={(e) => setPlannedQty(e.target.value)}
                  className="figma-qty-input"
                  required
                />
                <span className="figma-qty-unit">ad</span>
              </div>
            </div>

            {/* Row 2: İleri Tarihe Planla */}
            <div className="figma-bottom-row">
              <div className="figma-toggle-group">
                <label className="figma-switch">
                  <input
                    type="checkbox"
                    checked={isFutureDate}
                    onChange={(e) => setIsFutureDate(e.target.checked)}
                  />
                  <span className="figma-slider round" />
                </label>
                <span className="figma-toggle-text">İleri Tarihe Planla</span>
              </div>

              <div className="figma-date-picker-wrap">
                <Calendar size={16} className="figma-date-ico" />
                <input
                  type="text"
                  value={isFutureDate ? (planDate === '2026-08-26' ? '26/08/2026' : planDate) : 'Bugün'}
                  onChange={(e) => setPlanDate(e.target.value)}
                  className="figma-date-text-input"
                  disabled={!isFutureDate}
                />
              </div>
            </div>
          </div>

          {/* ==================================================================
              6. ACTION BUTTONS (VAZGEÇ & PLANLA)
              ================================================================== */}
          <div className="figma-modal-actions-row">
            <button
              type="button"
              className="figma-btn-cancel-large"
              onClick={onClose}
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="figma-btn-confirm-large"
            >
              Planla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}