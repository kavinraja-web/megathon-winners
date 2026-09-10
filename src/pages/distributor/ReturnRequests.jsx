import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Scale, Truck, XCircle } from 'lucide-react';

const ReturnRequests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { returns, updateReturn, batches, updateBatch } = useAppContext();
  
  const [selectedReturnId, setSelectedReturnId] = useState('');
  const [receivedQty, setReceivedQty] = useState('');
  const [mismatchNote, setMismatchNote] = useState('');

  const myReturns = returns.filter(r => r.distributor === 'Global Distributors');
  const selectedReturn = myReturns.find(r => r.id === selectedReturnId);
  const diff = selectedReturn ? parseInt(receivedQty || 0) - selectedReturn.declaredQuantity : 0;
  const isMismatch = diff !== 0 && receivedQty !== '';

  useEffect(() => {
    const verifyParam = searchParams.get('verify');
    if (verifyParam) {
      setSelectedReturnId(verifyParam);
      const ret = myReturns.find(r => r.id === verifyParam);
      if (ret && ret.receivedQuantity) {
        setReceivedQty(ret.receivedQuantity.toString());
      } else if (ret) {
        setReceivedQty(ret.declaredQuantity.toString()); // default
      }
    }
  }, [searchParams, myReturns]);

  const handleVerify = () => {
    if (!selectedReturn) return;
    
    updateReturn(selectedReturn.id, {
      receivedQuantity: parseInt(receivedQty),
      status: 'VERIFIED',
      timeline: [
        ...selectedReturn.timeline,
        { status: 'Quantity Verified', date: new Date().toISOString(), actor: 'Global Distributors', note: isMismatch ? mismatchNote : 'Match' }
      ]
    });

    const batch = batches.find(b => b.id === selectedReturn.batchId);
    if (batch) {
      updateBatch(batch.id, {
        history: [
          ...batch.history,
          { date: new Date().toISOString(), action: 'Verified by Distributor', actor: 'Global Distributors' }
        ]
      });
    }

    setSelectedReturnId('');
    setSearchParams({});
  };

  const handleSendToMfg = (retId) => {
    const ret = myReturns.find(r => r.id === retId);
    updateReturn(retId, {
      status: 'IN_TRANSIT_TO_MFG',
      timeline: [
        ...ret.timeline,
        { status: 'In Transit to Manufacturer', date: new Date().toISOString(), actor: 'Global Distributors' }
      ]
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Return Verification</h1>
        <p className="text-slate-500 mt-1">Verify physical quantities received from pharmacies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <Scale size={20} className="text-blue-600" />
              Verify Quantity
            </h2>

            {!selectedReturn ? (
              <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                Select a pending return from the list to begin verification.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-800 mb-1">{selectedReturn.pharmacy}</p>
                  <p className="text-xs text-slate-500 mb-3">{selectedReturn.medicine} ({selectedReturn.batchId})</p>
                  
                  <div className="flex justify-between items-center py-2 border-t border-slate-200">
                    <span className="text-sm text-slate-600">Declared Quantity:</span>
                    <span className="font-bold text-slate-800 text-lg">{selectedReturn.declaredQuantity}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Actual Received Quantity</label>
                  <input 
                    type="number" 
                    className={`w-full border rounded-lg px-4 py-3 text-lg font-bold outline-none transition-colors ${
                      isMismatch ? 'border-red-300 focus:ring-red-500 bg-red-50 text-red-700' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    value={receivedQty}
                    onChange={(e) => setReceivedQty(e.target.value)}
                  />
                </div>

                {isMismatch && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 text-red-700 font-bold mb-2">
                      <AlertTriangle size={18} />
                      Quantity Mismatch: {diff > 0 ? '+' : ''}{diff}
                    </div>
                    <label className="block text-xs font-medium text-red-800 mb-1">Reason for mismatch (Required)</label>
                    <textarea 
                      className="w-full border border-red-300 rounded p-2 text-sm outline-none focus:ring-1 focus:ring-red-500"
                      rows="2"
                      placeholder="E.g., Damaged during transit, Pharmacy miscount..."
                      value={mismatchNote}
                      onChange={(e) => setMismatchNote(e.target.value)}
                    ></textarea>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => { setSelectedReturnId(''); setSearchParams({}); }}
                    className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleVerify}
                    disabled={isMismatch && !mismatchNote}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm & Verify
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Requests List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="p-4">Return ID / Pharmacy</th>
                  <th className="p-4">Medicine</th>
                  <th className="p-4">Qty (Decl/Recv)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myReturns.map(ret => (
                  <tr key={ret.id} className={`hover:bg-slate-50 transition-colors ${selectedReturnId === ret.id ? 'bg-blue-50' : ''}`}>
                    <td className="p-4">
                      <div className="font-medium text-slate-800">{ret.id}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{ret.pharmacy}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-700">{ret.medicine}</td>
                    <td className="p-4 text-sm font-medium">
                      {ret.declaredQuantity} / {ret.receivedQuantity !== null ? ret.receivedQuantity : '-'}
                      {ret.receivedQuantity !== null && ret.receivedQuantity !== ret.declaredQuantity && (
                        <AlertTriangle size={14} className="inline text-red-500 ml-1 mb-1" />
                      )}
                    </td>
                    <td className="p-4">
                      {ret.status === 'PENDING_VERIFICATION' && <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">PENDING</span>}
                      {ret.status === 'VERIFIED' && <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">VERIFIED</span>}
                      {ret.status === 'IN_TRANSIT_TO_MFG' && <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">IN TRANSIT</span>}
                      {ret.status === 'COMPLETED' && <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">COMPLETED</span>}
                    </td>
                    <td className="p-4">
                      {ret.status === 'PENDING_VERIFICATION' && (
                        <button 
                          onClick={() => { setSelectedReturnId(ret.id); setReceivedQty(ret.declaredQuantity.toString()); }}
                          className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                        >
                          Verify
                        </button>
                      )}
                      {ret.status === 'VERIFIED' && (
                        <button 
                          onClick={() => handleSendToMfg(ret.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 rounded transition-colors"
                        >
                          <Truck size={14} /> Send to Mfg
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {myReturns.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">No return requests found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRequests;
