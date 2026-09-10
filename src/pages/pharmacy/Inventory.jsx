import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { AlertTriangle, Tag, Check, ArrowRightLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const { batches, updateBatch } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  const myInventory = batches.filter(b => b.owner === 'Pharmacy XYZ' && b.currentQuantity > 0);
  
  const filteredInventory = myInventory.filter(b => 
    b.medicine.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSimulateSale = () => {
    if (selectedBatch) {
      // Simulate selling 20 units
      const sellAmount = Math.min(20, selectedBatch.currentQuantity);
      updateBatch(selectedBatch.id, {
        currentQuantity: selectedBatch.currentQuantity - sellAmount
      });
      setShowDiscountModal(false);
      setSelectedBatch(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inventory Management</h1>
          <p className="text-slate-500 mt-1">Manage stock, near-expiry alerts, and discount sales.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search inventory..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 uppercase tracking-wider">
              <th className="p-4">Batch / Medicine</th>
              <th className="p-4">Expiry Date</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredInventory.map(batch => (
              <tr key={batch.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-slate-800">{batch.medicine}</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{batch.id}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {batch.status === 'NEAR_EXPIRY' && <AlertTriangle size={14} className="text-yellow-500" />}
                    {batch.status === 'EXPIRED' && <AlertTriangle size={14} className="text-red-500" />}
                    <span className={batch.status === 'EXPIRED' ? 'text-red-600 font-medium' : 'text-slate-700'}>
                      {new Date(batch.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-medium text-slate-800">{batch.currentQuantity}</span>
                  <span className="text-xs text-slate-500 ml-1">/ {batch.originalQuantity}</span>
                </td>
                <td className="p-4">
                  {batch.status === 'SAFE' && <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">SAFE</span>}
                  {batch.status === 'NEAR_EXPIRY' && <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">NEAR EXPIRY</span>}
                  {batch.status === 'EXPIRED' && <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">EXPIRED</span>}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Link 
                      to={`/batch/${batch.id}`}
                      className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 rounded transition-colors"
                    >
                      Details
                    </Link>
                    
                    {batch.status === 'NEAR_EXPIRY' && (
                      <button 
                        onClick={() => { setSelectedBatch(batch); setShowDiscountModal(true); }}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        <Tag size={14} /> Discount
                      </button>
                    )}
                    
                    {(batch.status === 'NEAR_EXPIRY' || batch.status === 'EXPIRED') && (
                      <Link 
                        to={`/pharmacy/returns?batch=${batch.id}`}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 rounded transition-colors"
                      >
                        <ArrowRightLeft size={14} /> Return
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredInventory.length === 0 && (
          <div className="p-8 text-center text-slate-500">No inventory found matching your criteria.</div>
        )}
      </div>

      {/* Discount Sale Modal */}
      {showDiscountModal && selectedBatch && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white">
              <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2 mb-1">
                <Tag className="text-blue-600" />
                Discount Sale Opportunity
              </h3>
              <p className="text-sm text-slate-500">Accelerate sales for near-expiry stock.</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="font-semibold text-slate-800">{selectedBatch.medicine}</div>
                <div className="text-sm text-slate-500 font-mono mt-1">Batch: {selectedBatch.id}</div>
                <div className="text-sm text-red-600 font-medium mt-2 flex items-center gap-1">
                  <AlertTriangle size={14} /> Expires: {new Date(selectedBatch.expiryDate).toLocaleDateString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-200 p-3 rounded-lg text-center">
                  <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Original Price</p>
                  <p className="text-lg font-bold text-slate-400 line-through">₹120.00</p>
                </div>
                <div className="border border-blue-200 bg-blue-50 p-3 rounded-lg text-center shadow-sm">
                  <p className="text-xs text-blue-600 font-semibold uppercase mb-1">Suggested Price</p>
                  <p className="text-2xl font-bold text-blue-700">₹85.00</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 border border-yellow-200 flex gap-2">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <p>Ensure customer is informed of the near-expiry date prior to purchase.</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowDiscountModal(false)}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSimulateSale}
                className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <Check size={16} /> Simulate Sale (20 units)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
