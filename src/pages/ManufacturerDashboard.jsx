import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { usePharma } from '../context/PharmaContext';
import StatusBadge from '../components/StatusBadge';
import BatchTimeline from '../components/BatchTimeline';
import { Factory, AlertTriangle, ChevronRight } from 'lucide-react';

export default function ManufacturerDashboard() {
  const { returns, batches, manufacturerReceive } = usePharma();
  const [selectedBatch, setSelectedBatch] = useState(null);

  const pendingReceive = returns.filter(r => r.status === 'IN_TRANSIT_MANUFACTURER');

  return (
    <DashboardLayout role="manufacturer" title="Manufacturer Portal">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
          <div className="p-3 rounded-lg bg-purple-50 text-purple-600 mr-4">
            <Factory className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Arrival</p>
            <p className="text-2xl font-bold text-gray-900">{pendingReceive.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">Incoming Returns</h3>
            </div>
            
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {returns.map((ret) => (
                  <tr key={ret.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedBatch(batches.find(b => b.id === ret.batchId))}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ret.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{ret.batchId}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={ret.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {ret.status === 'IN_TRANSIT_MANUFACTURER' ? (
                        <button 
                          onClick={(e) => { e.stopPropagation(); manufacturerReceive(ret.id); }}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          Mark Received
                        </button>
                      ) : (
                        <span className="text-gray-400">Received</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-1">
          {selectedBatch ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Batch Traceability</h3>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500">Batch Number</p>
                <p className="text-xl font-bold font-mono text-gray-900">{selectedBatch.id}</p>
                <div className="mt-2">
                  <StatusBadge status={selectedBatch.status} />
                </div>
              </div>

              <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Medicine</span>
                  <span className="font-medium">{selectedBatch.medicine}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Expiry</span>
                  <span className="font-medium">{selectedBatch.expiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Qty</span>
                  <span className="font-medium">{selectedBatch.currentQuantity}</span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-gray-900 uppercase mb-4">Lifecycle Timeline</h4>
              <BatchTimeline history={selectedBatch.history} />
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border border-gray-200 border-dashed p-10 flex flex-col items-center justify-center text-center h-full">
              <ChevronRight className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-gray-500 font-medium">Select a batch to view complete traceability timeline</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
