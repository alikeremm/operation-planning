export const OPERATIONS = [
  { id: 'all', name: 'Tümü', count: 6 },
  { id: 'op1', name: 'Operasyon 1', count: 2 },
  { id: 'op2', name: 'Operasyon 2', count: 2 },
  { id: 'op3', name: 'Operasyon 3', count: 2 },
];

export const INITIAL_PRODUCTS = [
  { id: 'prod-1', name: 'Ürün A', code: 'KOD-001', workOrder: 'EMR-101', remaining: 100, planned: 50, opId: 'op1' },
  { id: 'prod-2', name: 'Ürün B', code: 'KOD-002', workOrder: 'EMR-102', remaining: 200, planned: 80, opId: 'op1' },
  { id: 'prod-3', name: 'Ürün C', code: 'KOD-003', workOrder: 'EMR-103', remaining: 150, planned: 30, opId: 'op2' },
  { id: 'prod-4', name: 'Ürün D', code: 'KOD-004', workOrder: 'EMR-104', remaining: 90, planned: 40, opId: 'op2' },
  { id: 'prod-5', name: 'Ürün E', code: 'KOD-005', workOrder: 'EMR-105', remaining: 300, planned: 120, opId: 'op3' },
  { id: 'prod-6', name: 'Ürün F', code: 'KOD-006', workOrder: 'EMR-106', remaining: 75, planned: 25, opId: 'op3' },
];

export const INITIAL_STATIONS = [
  {
    id: 'station-1',
    name: 'İstasyon 1',
    workload: '8 sa',
    plannedCards: [{ id: 'plan-1', title: 'Ürün A', code: 'KOD-001', qty: 50, status: 'Tamamlandı' }],
    timelineBlocks: [
      { id: 't1', label: '08:00 - 12:00', title: 'İş Emri 101', color: '#2563eb' },
      { id: 't2', label: '13:00 - 17:00', title: 'İş Emri 102', color: '#7c3aed' },
    ],
  },
  { id: 'station-2', name: 'İstasyon 2', workload: '0 sa', plannedCards: [], timelineBlocks: [] },
  { id: 'station-3', name: 'İstasyon 3', workload: '0 sa', plannedCards: [], timelineBlocks: [] },
];
