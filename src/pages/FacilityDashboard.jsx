import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { usePharma } from '../context/PharmaContext';
import StatusBadge from '../components/StatusBadge';
import { Building2, ShieldAlert, FileText, CheckCircle2, Download } from 'lucide-react';

export default function FacilityDashboard() {
  const { batches, destroyBatch } = usePharma();
  const [selectedCert, setSelectedCert] = useState(null);

  const pendingDestruction = batches.filter(b => b.status === 'RECEIVED_MANUFACTURER');
  const destroyed = batches.filter(b => b.status === 'DESTROYED');

  const handleDestroy = (batchId) => {
    destroyBatch(batchId, 'SafeWaste Destruction Facility');
  };

  return (
    <DashboardLayout role="facility" title="Destruction Facility Portal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pending Destruction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-red-50 flex items-center">
            <ShieldAlert className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-bold text-red-800">Pending Destruction</h3>
          </div>
          <div className="p-0">
            {pendingDestruction.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">No batches awaiting destruction.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {pendingDestruction.map(batch => (
                  <li key={batch.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-gray-900">{batch.medicine}</p>
                        <p className="text-sm text-gray-500 font-mono mt-1">Batch: {batch.id} • Qty: {batch.currentQuantity}</p>
                      </div>
                      <button 
                        onClick={() => handleDestroy(batch.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded shadow-sm hover:bg-red-700 font-medium text-sm flex items-center transition-colors"
                      >
                        Execute Destruction
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Digital Certificates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center">
            <FileText className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-800">Destruction Certificates</h3>
          </div>
          <div className="p-0">
            {destroyed.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">No certificates generated yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {destroyed.map(batch => (
                  <li key={batch.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setSelectedCert(batch)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-full mr-4">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{batch.certificateId}</p>
                          <p className="text-xs text-gray-500">Batch: {batch.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{batch.destructionDate}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200">
            
            <div className="bg-slate-900 px-8 py-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif tracking-wide text-green-400">DIGITAL CERTIFICATE OF DESTRUCTION</h2>
                <p className="text-slate-400 text-sm mt-1 font-mono">ID: {selectedCert.certificateId}</p>
              </div>
              <ShieldAlert className="h-12 w-12 text-slate-700" />
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Facility Details</p>
                  <p className="font-medium text-gray-900">SafeWaste Destruction Facility</p>
                  <p className="text-gray-600 text-sm">Auth No: EPA-9923-X</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Date of Destruction</p>
                  <p className="font-medium text-gray-900">{selectedCert.destructionDate}</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 mb-8">
                <p className="text-center text-sm text-gray-600 mb-6">
                  This certifies that the following pharmaceutical materials have been securely and completely destroyed in accordance with environmental and healthcare regulations.
                </p>
                
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div className="text-gray-500">Medicine:</div>
                  <div className="font-bold text-gray-900 text-right">{selectedCert.medicine}</div>
                  
                  <div className="text-gray-500">Batch Number:</div>
                  <div className="font-mono font-bold text-gray-900 text-right">{selectedCert.id}</div>
                  
                  <div className="text-gray-500">Manufacturer:</div>
                  <div className="font-medium text-gray-900 text-right">{selectedCert.manufacturer}</div>
                  
                  <div className="text-gray-500">Quantity Destroyed:</div>
                  <div className="font-bold text-gray-900 text-right">{selectedCert.currentQuantity} units</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 py-3 rounded-lg border border-green-200">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-bold tracking-wide">✓ VERIFIED BLOCKCHAIN RECORD</span>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex justify-between items-center">
              <button onClick={() => setSelectedCert(null)} className="text-gray-500 hover:text-gray-700 font-medium text-sm">Close</button>
              <button className="flex items-center px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors text-sm font-medium">
                <Download className="h-4 w-4 mr-2" /> Download PDF
              </button>
            </div>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
