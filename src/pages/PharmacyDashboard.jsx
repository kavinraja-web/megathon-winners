import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { usePharma } from '../context/PharmaContext';
import StatusBadge from '../components/StatusBadge';
import { Package, AlertCircle, ArrowRightLeft, DollarSign } from 'lucide-react';

export default function PharmacyDashboard() {
  const { batches, sellDiscounted, initiateReturn } = usePharma();
  const [activeTab, setActiveTab] = useState('inventory');

  const myBatches = batches.filter(b => b.currentLocation === 'Pharmacy XYZ');
  const nearExpiry = myBatches.filter(b => b.status === 'NEAR EXPIRY');
  const returnInitiated = myBatches.filter(b => b.status === 'RETURN_INITIATED');

  return (
    <DashboardLayout role="pharmacy" title="Pharmacy Portal">
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-8">
        {[
          { name: 'Total Batches', value: myBatches.length, icon: Package, color: 'text-blue-600' },
          { name: 'Near Expiry', value: nearExpiry.length, icon: AlertCircle, color: 'text-yellow-600' },
          { name: 'Pending Returns', value: returnInitiated.length, icon: ArrowRightLeft, color: 'text-indigo-600' },
          { name: 'Discount Sales', value: 1, icon: DollarSign, color: 'text-green-600' }
        ].map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
            <div className={`p-3 rounded-lg bg-gray-50 ${stat.color} mr-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {['inventory', 'near-expiry', 'returns'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'near-expiry' && (
            <div className="space-y-4">
              {nearExpiry.length === 0 ? (
                <p className="text-gray-500">No near-expiry medicines found.</p>
              ) : (
                nearExpiry.map((batch) => (
                  <div key={batch.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{batch.medicine}</h3>
                        <p className="text-sm text-gray-600 font-mono">Batch: {batch.id} • Expiry: {batch.expiryDate}</p>
                      </div>
                      <StatusBadge status={batch.status} />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-xs text-gray-500 uppercase">Current Qty</p>
                        <p className="font-bold text-lg">{batch.currentQuantity}</p>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-xs text-gray-500 uppercase">Original Price</p>
                        <p className="font-bold text-lg line-through text-gray-400">${batch.price.toFixed(2)}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded shadow-sm border border-green-200">
                        <p className="text-xs text-green-700 uppercase font-bold">Discount Price</p>
                        <p className="font-bold text-lg text-green-800">${batch.discountedPrice.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button 
                        onClick={() => sellDiscounted(batch.id, 1)}
                        className="px-4 py-2 bg-green-600 text-white rounded shadow-sm hover:bg-green-700 font-medium text-sm flex items-center"
                      >
                        <DollarSign className="h-4 w-4 mr-1" /> Sell 1 Unit (Discount)
                      </button>
                      <button 
                        onClick={() => initiateReturn(batch.id, batch.currentQuantity)}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded shadow-sm hover:bg-gray-50 font-medium text-sm flex items-center"
                      >
                        <ArrowRightLeft className="h-4 w-4 mr-1" /> Initiate Return
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'inventory' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch / Medicine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myBatches.map((batch) => (
                  <tr key={batch.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{batch.medicine}</div>
                      <div className="text-sm text-gray-500 font-mono">{batch.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.expiryDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{batch.currentQuantity} / {batch.originalQuantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={batch.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {activeTab === 'returns' && (
            <p className="text-gray-500">Return tracking interface here...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
