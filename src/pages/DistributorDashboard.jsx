import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { usePharma } from '../context/PharmaContext';
import StatusBadge from '../components/StatusBadge';
import { Truck, CheckCircle, AlertTriangle } from 'lucide-react';

export default function DistributorDashboard() {
  const { returns, verifyReturn } = usePharma();
  const [verifyModal, setVerifyModal] = useState(null);
  const [receivedQty, setReceivedQty] = useState('');

  const pendingPickups = returns.filter(r => r.status === 'PENDING_PICKUP');

  const handleVerify = () => {
    verifyReturn(verifyModal.id, parseInt(receivedQty));
    setVerifyModal(null);
  };

  return (
    <DashboardLayout role="distributor" title="Distributor Portal">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 mr-4">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Pickups</p>
            <p className="text-2xl font-bold text-gray-900">{pendingPickups.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Return Requests</h3>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return ID / Batch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source Pharmacy</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Declared Qty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {returns.map((ret) => (
              <tr key={ret.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{ret.id}</div>
                  <div className="text-sm text-gray-500 font-mono">{ret.batchId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ret.pharmacy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{ret.declaredQuantity}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={ret.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {ret.status === 'PENDING_PICKUP' && (
                    <button 
                      onClick={() => { setVerifyModal(ret); setReceivedQty(ret.declaredQuantity); }}
                      className="text-blue-600 hover:text-blue-900 flex items-center justify-end w-full"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" /> Verify & Pickup
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {verifyModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Verify Quantity: {verifyModal.batchId}</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-500 mb-1">Declared Quantity by Pharmacy</p>
              <p className="text-2xl font-bold text-gray-900">{verifyModal.declaredQuantity}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Actual Received Quantity</label>
              <input 
                type="number" 
                value={receivedQty}
                onChange={(e) => setReceivedQty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {parseInt(receivedQty) !== verifyModal.declaredQuantity && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" /> Quantity mismatch detected. A dispute will be logged.
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setVerifyModal(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleVerify}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Confirm Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
