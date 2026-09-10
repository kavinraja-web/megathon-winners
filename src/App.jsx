import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PharmaProvider } from './context/PharmaContext';
import FraudAlertModal from './components/FraudAlertModal';

import Landing from './pages/Landing';
import PharmacyDashboard from './pages/PharmacyDashboard';
import DistributorDashboard from './pages/DistributorDashboard';
import ManufacturerDashboard from './pages/ManufacturerDashboard';
import FacilityDashboard from './pages/FacilityDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Scanner from './pages/Scanner';

function App() {
  return (
    <PharmaProvider>
      <Router>
        <FraudAlertModal />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pharmacy/*" element={<PharmacyDashboard />} />
          <Route path="/distributor/*" element={<DistributorDashboard />} />
          <Route path="/manufacturer/*" element={<ManufacturerDashboard />} />
          <Route path="/facility/*" element={<FacilityDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/scan" element={<Scanner />} />
        </Routes>
      </Router>
    </PharmaProvider>
  );
}

export default App;
