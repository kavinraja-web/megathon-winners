export const initialBatches = [
  {
    id: "PCM-78421",
    medicine: "Paracetamol 500mg",
    manufacturer: "ABC Pharma",
    manufacturedDate: "2026-01-10",
    expiryDate: "2026-09-30",
    originalQuantity: 500,
    currentQuantity: 120,
    status: "NEAR_EXPIRY",
    owner: "Pharmacy XYZ",
    history: [
      { date: "2026-01-15", action: "Manufactured", actor: "ABC Pharma" },
      { date: "2026-01-20", action: "Distributed", actor: "Global Distributors" },
      { date: "2026-01-25", action: "Received", actor: "Pharmacy XYZ" }
    ]
  },
  {
    id: "AMX-23190",
    medicine: "Amoxicillin 500mg",
    manufacturer: "HealthCorp",
    manufacturedDate: "2025-10-15",
    expiryDate: "2026-10-15",
    originalQuantity: 280,
    currentQuantity: 50,
    status: "SAFE",
    owner: "Pharmacy XYZ",
    history: [
      { date: "2025-10-20", action: "Manufactured", actor: "HealthCorp" },
      { date: "2025-10-25", action: "Distributed", actor: "Global Distributors" },
      { date: "2025-11-01", action: "Received", actor: "Pharmacy XYZ" }
    ]
  },
  {
    id: "AZT-55231",
    medicine: "Azithromycin 250mg",
    manufacturer: "MediLife",
    manufacturedDate: "2024-11-05",
    expiryDate: "2026-11-05",
    originalQuantity: 150,
    currentQuantity: 0,
    status: "DESTROYED",
    owner: "SafeDestroy Facility",
    history: [
      { date: "2024-11-10", action: "Manufactured", actor: "MediLife" },
      { date: "2026-08-01", action: "Returned", actor: "Pharmacy XYZ" },
      { date: "2026-08-10", action: "Verified", actor: "Global Distributors" },
      { date: "2026-08-15", action: "Received", actor: "MediLife" },
      { date: "2026-08-20", action: "Destroyed", actor: "SafeDestroy Facility", certificateId: "CERT-9901-XZY" }
    ]
  },
  {
    id: "IBU-99012",
    medicine: "Ibuprofen 400mg",
    manufacturer: "ABC Pharma",
    manufacturedDate: "2025-05-01",
    expiryDate: "2026-05-01",
    originalQuantity: 1000,
    currentQuantity: 200,
    status: "EXPIRED",
    owner: "Pharmacy XYZ",
    history: [
      { date: "2025-05-10", action: "Manufactured", actor: "ABC Pharma" },
      { date: "2025-05-15", action: "Distributed", actor: "Global Distributors" },
      { date: "2025-05-20", action: "Received", actor: "Pharmacy XYZ" }
    ]
  }
];

export const initialReturns = [
  {
    id: "RET-1001",
    batchId: "IBU-99012",
    medicine: "Ibuprofen 400mg",
    pharmacy: "Pharmacy XYZ",
    distributor: "Global Distributors",
    declaredQuantity: 200,
    receivedQuantity: 200,
    status: "PENDING_VERIFICATION",
    date: "2026-09-05",
    timeline: [
      { status: "Return Initiated", date: "2026-09-05", actor: "Pharmacy XYZ" }
    ]
  }
];

export const initialAlerts = [
  {
    id: "ALT-001",
    batchId: "AZT-55231",
    type: "FRAUD",
    severity: "CRITICAL",
    message: "Destroyed batch detected in circulation.",
    date: "2026-09-10T09:31:00"
  }
];
