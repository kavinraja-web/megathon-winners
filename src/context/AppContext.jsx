import React, { createContext, useContext, useState } from 'react';
import { initialBatches, initialReturns, initialAlerts } from '../data/mockData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [batches, setBatches] = useState(initialBatches);
  const [returns, setReturns] = useState(initialReturns);
  const [alerts, setAlerts] = useState(initialAlerts);

  const updateBatch = (id, updates) => {
    setBatches(batches.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const addReturn = (newReturn) => {
    setReturns([...returns, newReturn]);
  };

  const updateReturn = (id, updates) => {
    setReturns(returns.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const addAlert = (newAlert) => {
    setAlerts([newAlert, ...alerts]);
  };

  const simulateScan = (batchId, location) => {
    const batch = batches.find(b => b.id === batchId);
    if (batch && batch.status === 'DESTROYED') {
      const alert = {
        id: `ALT-${Date.now()}`,
        batchId: batch.id,
        type: 'FRAUD',
        severity: 'CRITICAL',
        message: `Destroyed batch detected in circulation at ${location}.`,
        date: new Date().toISOString()
      };
      addAlert(alert);
      return { success: true, isFraud: true, batch };
    }
    return { success: true, isFraud: false, batch };
  };

  return (
    <AppContext.Provider value={{
      batches, setBatches, updateBatch,
      returns, setReturns, addReturn, updateReturn,
      alerts, setAlerts, addAlert,
      simulateScan
    }}>
      {children}
    </AppContext.Provider>
  );
};
