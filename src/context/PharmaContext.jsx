import React, { createContext, useState, useContext } from 'react';
import { initialBatches, initialReturns, initialFraudAlerts } from '../data/mockData';

const PharmaContext = createContext();

export const usePharma = () => useContext(PharmaContext);

export const PharmaProvider = ({ children }) => {
  const [batches, setBatches] = useState(initialBatches);
  const [returns, setReturns] = useState(initialReturns);
  const [alerts, setAlerts] = useState(initialFraudAlerts);
  const [fraudModalOpen, setFraudModalOpen] = useState(false);
  const [currentFraudAlert, setCurrentFraudAlert] = useState(null);

  // Pharmacy: Sell discounted medicine
  const sellDiscounted = (batchId, qty) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return { ...b, currentQuantity: b.currentQuantity - qty };
      }
      return b;
    }));
  };

  // Pharmacy: Initiate Return
  const initiateReturn = (batchId, qty) => {
    const batch = batches.find(b => b.id === batchId);
    if (!batch) return;

    const newReturn = {
      id: `RET-${Math.floor(1000 + Math.random() * 9000)}`,
      batchId,
      medicine: batch.medicine,
      pharmacy: batch.currentLocation,
      distributor: 'Global Meds Dist',
      declaredQuantity: qty,
      status: 'PENDING_PICKUP',
      date: new Date().toISOString().split('T')[0]
    };

    setReturns(prev => [newReturn, ...prev]);

    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          status: 'RETURN_INITIATED',
          history: [...b.history, { step: b.history.length + 1, action: 'Return Initiated', org: b.currentLocation, date: new Date().toISOString().split('T')[0] }]
        };
      }
      return b;
    }));
  };

  // Distributor: Verify and Pick Up
  const verifyReturn = (returnId, receivedQty) => {
    setReturns(prev => prev.map(r => {
      if (r.id === returnId) {
        return { ...r, status: 'IN_TRANSIT_MANUFACTURER', receivedQuantity: receivedQty };
      }
      return r;
    }));

    const ret = returns.find(r => r.id === returnId);
    if (ret) {
      setBatches(prev => prev.map(b => {
        if (b.id === ret.batchId) {
          return {
            ...b,
            status: 'IN_TRANSIT',
            currentLocation: ret.distributor,
            history: [...b.history, { step: b.history.length + 1, action: 'Verified & Picked Up', org: ret.distributor, date: new Date().toISOString().split('T')[0] }]
          };
        }
        return b;
      }));
    }
  };

  // Manufacturer: Receive
  const manufacturerReceive = (returnId) => {
    setReturns(prev => prev.map(r => {
      if (r.id === returnId) {
        return { ...r, status: 'PENDING_DESTRUCTION' };
      }
      return r;
    }));

    const ret = returns.find(r => r.id === returnId);
    if (ret) {
      setBatches(prev => prev.map(b => {
        if (b.id === ret.batchId) {
          return {
            ...b,
            status: 'RECEIVED_MANUFACTURER',
            currentLocation: b.manufacturer,
            history: [...b.history, { step: b.history.length + 1, action: 'Received by Manufacturer', org: b.manufacturer, date: new Date().toISOString().split('T')[0] }]
          };
        }
        return b;
      }));
    }
  };

  // Facility: Destroy
  const destroyBatch = (batchId, facilityName) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          status: 'DESTROYED',
          currentLocation: facilityName,
          destructionDate: new Date().toISOString().split('T')[0],
          certificateId: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
          history: [...b.history, { step: b.history.length + 1, action: 'Destroyed', org: facilityName, date: new Date().toISOString().split('T')[0] }]
        };
      }
      return b;
    }));
  };

  // Scanner: Check for Re-entry
  const scanBatch = (batchId, scannedLocation) => {
    const batch = batches.find(b => b.id === batchId);
    if (!batch) return null;

    if (batch.status === 'DESTROYED') {
      const newAlert = {
        id: `ALERT-${Math.floor(1000 + Math.random() * 9000)}`,
        batchId: batch.id,
        medicine: batch.medicine,
        previousStatus: 'DESTROYED',
        detectedLocation: scannedLocation,
        date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        risk: 'CRITICAL'
      };
      setAlerts(prev => [newAlert, ...prev]);
      setCurrentFraudAlert(newAlert);
      setFraudModalOpen(true);
      return { alert: true, batch };
    }
    return { alert: false, batch };
  };

  const closeFraudModal = () => {
    setFraudModalOpen(false);
    setCurrentFraudAlert(null);
  };

  return (
    <PharmaContext.Provider value={{
      batches, returns, alerts,
      sellDiscounted, initiateReturn, verifyReturn, manufacturerReceive, destroyBatch,
      scanBatch, fraudModalOpen, currentFraudAlert, closeFraudModal
    }}>
      {children}
    </PharmaContext.Provider>
  );
};
