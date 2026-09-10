export const initialBatches = [
  {
    id: 'PCM-78421',
    medicine: 'Paracetamol 500mg',
    manufacturer: 'ABC Pharma',
    manufacturedDate: '2025-01-10',
    expiryDate: '2026-09-30',
    originalQuantity: 500,
    currentQuantity: 120,
    status: 'NEAR EXPIRY',
    currentLocation: 'Pharmacy XYZ',
    history: [
      { step: 1, action: 'Manufactured', org: 'ABC Pharma', date: '2025-01-10' },
      { step: 2, action: 'Distributed', org: 'Global Meds Dist', date: '2025-02-15' },
      { step: 3, action: 'Received', org: 'Pharmacy XYZ', date: '2025-02-18' }
    ],
    price: 15.00,
    discountedPrice: 5.00
  },
  {
    id: 'AMX-23190',
    medicine: 'Amoxicillin 500mg',
    manufacturer: 'HealthCare Inc',
    manufacturedDate: '2025-03-20',
    expiryDate: '2026-10-15',
    originalQuantity: 1000,
    currentQuantity: 280,
    status: 'SAFE',
    currentLocation: 'Pharmacy XYZ',
    history: [
      { step: 1, action: 'Manufactured', org: 'HealthCare Inc', date: '2025-03-20' },
      { step: 2, action: 'Distributed', org: 'FastCare Logistics', date: '2025-04-10' },
      { step: 3, action: 'Received', org: 'Pharmacy XYZ', date: '2025-04-15' }
    ]
  },
  {
    id: 'AZT-55231',
    medicine: 'Azithromycin 250mg',
    manufacturer: 'ABC Pharma',
    manufacturedDate: '2024-05-11',
    expiryDate: '2025-11-05',
    originalQuantity: 300,
    currentQuantity: 150,
    status: 'EXPIRED',
    currentLocation: 'Pharmacy XYZ',
    history: [
      { step: 1, action: 'Manufactured', org: 'ABC Pharma', date: '2024-05-11' },
      { step: 2, action: 'Distributed', org: 'Global Meds Dist', date: '2024-06-01' },
      { step: 3, action: 'Received', org: 'Pharmacy XYZ', date: '2024-06-05' }
    ]
  }
];

export const initialReturns = [
  {
    id: 'RET-1001',
    batchId: 'AZT-55231',
    medicine: 'Azithromycin 250mg',
    pharmacy: 'Pharmacy XYZ',
    distributor: 'Global Meds Dist',
    declaredQuantity: 150,
    status: 'PENDING_PICKUP',
    date: '2026-09-08'
  }
];

export const initialFraudAlerts = [];
