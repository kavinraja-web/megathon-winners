import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ArrowRightLeft, Package, Truck, Calendar, CheckCircle2 } from 'lucide-react';

const CreateReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { batches, addReturn, updateBatch, returns } = useAppContext();
  
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [returnQuantity, setReturnQuantity] = useState('');
  const [reason, setReason] = useState('EXPIRED');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const myBatches = batches.filter(b => b.owner === 'Pharmacy XYZ' && b.currentQuantity > 0);
  const selectedBatch = batches.find(b => b.id === selectedBatchId);
  const myReturns = returns.filter(r => r.pharmacy === 'Pharmacy XYZ');

  useEffect(() => {
    const batchParam = searchParams.get('batch');
    if (batchParam) {
      setSelectedBatchId(batchParam);
      const b = batches.find(x => x.id === batchParam);
      if (b) setReturnQuantity(b.currentQuantity.toString());
    }
  }, [searchParams, batches]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBatch || !returnQuantity) return;

    const qty = parseInt(returnQuantity);
    
    // Create new return request
    const newReturn = {
      id: `RET-${Math.floor(1000 + Math.random() * 9000)}`,
      batchId: selectedBatch.id,
      medicine: selectedBatch.medicine,
      pharmacy: 'Pharmacy XYZ',
      distributor: 'Global Distributors',
      declaredQuantity: qty,
      receivedQuantity: null,
      status: 'PENDING_VERIFICATION',
      date: new Date().toISOString(),
      timeline: [
        { status: 'Return Initiated', date: new Date().toISOString(), actor: 'Pharmacy XYZ' }
      ]
    };

    addReturn(newReturn);
    
    // Update batch history and status
    updateBatch(selectedBatch.id, {
      currentQuantity: selectedBatch.currentQuantity - qty,
      history: [
        ...selectedBatch.history,
        { date: new Date().toISOString(), action: 'Returned', actor: 'Pharmacy XYZ' }
      ]
    });

    setIsSubmitted(true);
    setTimeout(() => {
      navigate('/pharmacy');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Return Management</h1>
        <p className="text-slate-500 mt-1">Initiate returns for near-expiry or expired medicines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Return Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
            {isSubmitted ? (
              <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-6 text-center">
                <CheckCircle2 size={48} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Return Initiated!</h3>
                <p className="text-slate-500">The distributor has been notified and a pickup will be scheduled.</p>
              </div>
            ) : null}

            <div className="flex items-center gap-2 mb-6">
              <ArrowRightLeft className="text-purple-600" size={20} />
              <h2 className="text-lg font-semibold text-slate-800">Create New Return</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Batch</label>
                <select 
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                  value={selectedBatchId}
                  onChange={(e) => {
                    setSelectedBatchId(e.target.value);
                    const b = batches.find(x => x.id === e.target.value);
                    if (b) setReturnQuantity(b.currentQuantity.toString());
                  }}
                  required
                >
                  <option value="">-- Select a batch --</option>
                  {myBatches.map(b => (
                    <option key={b.id} value={b.id}>{b.medicine} ({b.id}) - Qty: {b.currentQuantity}</option>
                  ))}
                </select>
              </div>

              {selectedBatch && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-500">Expiry:</span>
                    <span className="font-medium text-slate-800">{new Date(selectedBatch.expiryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-500">Manufacturer:</span>
                    <span className="font-medium text-slate-800">{selectedBatch.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Max Qty available:</span>
                    <span className="font-medium text-slate-800">{selectedBatch.currentQuantity}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Return Quantity</label>
                <input 
                  type="number" 
                  min="1"
                  max={selectedBatch?.currentQuantity || 1}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                  value={returnQuantity}
                  onChange={(e) => setReturnQuantity(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                <select 
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="EXPIRED">Expired</option>
                  <option value="NEAR_EXPIRY">Near Expiry / Unsold</option>
                  <option value="DAMAGED">Damaged</option>
                  <option value="RECALL">Product Recall</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={!selectedBatchId}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition-colors"
                >
                  Submit Return Request
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* History / Active Returns */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-semibold text-slate-800">Your Returns</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {myReturns.map(ret => (
                <div key={ret.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-800">{ret.medicine}</span>
                        <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{ret.batchId}</span>
                      </div>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <Calendar size={14} /> Requested on {new Date(ret.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
                      {ret.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Minimal progress tracker */}
                  <div className="mt-6 flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
                    
                    <div className="flex flex-col items-center bg-white px-2">
                      <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mb-1">
                        <CheckCircle2 size={12} />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-600">Initiated</span>
                    </div>

                    <div className="flex flex-col items-center bg-white px-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${ret.status !== 'PENDING_VERIFICATION' ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                        <Truck size={12} />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-600">Transit</span>
                    </div>

                    <div className="flex flex-col items-center bg-white px-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${ret.status === 'COMPLETED' ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                        <Package size={12} />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-600">Verified</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {myReturns.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                  You have not initiated any returns yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReturn;
