import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DashboardLayout from './components/layout/DashboardLayout';

// Shared
import BatchDetails from './components/shared/BatchDetails';

// Pharmacy
import PharmacyDashboard from './pages/pharmacy/PharmacyDashboard';
import Inventory from './pages/pharmacy/Inventory';
import CreateReturn from './pages/pharmacy/CreateReturn';

// Distributor
import DistributorDashboard from './pages/distributor/DistributorDashboard';
import ReturnRequests from './pages/distributor/ReturnRequests';

// Manufacturer
import ManufacturerDashboard from './pages/manufacturer/ManufacturerDashboard';
import FraudDetection from './pages/manufacturer/FraudDetection';
import ReturnedBatches from './pages/manufacturer/ReturnedBatches';

// Facility
import FacilityDashboard from './pages/facility/FacilityDashboard';
import DestructionProcessing from './pages/facility/DestructionProcessing';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import GlobalMonitoring from './pages/admin/GlobalMonitoring';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/pharmacy" replace />} />
          
          <Route element={<DashboardLayout />}>
            {/* Pharmacy Routes */}
            <Route path="/pharmacy" element={<PharmacyDashboard />} />
            <Route path="/pharmacy/inventory" element={<Inventory />} />
            <Route path="/pharmacy/returns" element={<CreateReturn />} />
            
            {/* Distributor Routes */}
            <Route path="/distributor" element={<DistributorDashboard />} />
            <Route path="/distributor/returns" element={<ReturnRequests />} />

            {/* Manufacturer Routes */}
            <Route path="/manufacturer" element={<ManufacturerDashboard />} />
            <Route path="/manufacturer/fraud" element={<FraudDetection />} />
            <Route path="/manufacturer/batches" element={<ReturnedBatches />} />

            {/* Facility Routes */}
            <Route path="/facility" element={<FacilityDashboard />} />
            <Route path="/facility/destruction" element={<DestructionProcessing />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/monitoring" element={<GlobalMonitoring />} />

            {/* Shared */}
            <Route path="/batch/:id" element={<BatchDetails />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
