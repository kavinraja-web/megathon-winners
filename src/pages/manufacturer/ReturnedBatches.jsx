import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Package, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReturnedBatches = () => {
  const { returns, updateReturn, batches, updateBatch } = useAppContext();

  const incomingReturns = returns.filter(r => r.status === 'IN_TRANSIT_TO_MFG');
  const pastReturns = returns.filter(r => r.status === 'COMPLETED');

  const handleReceiveAndSendToDestruction = (retId) => {
    const ret = returns.find(r => r.id === retId);
    if (!ret) return;

    updateReturn(retId, {
      status: 'COMPLETED',
      timeline: [
        ...ret.timeline,
        { status: 'Received by Manufacturer', date: new Date().toISOString(), actor: 'ABC Pharma' },
        { status: 'Sent for Destruction', date: new Date().toISOString(), actor: 'ABC Pharma' }
      ]
    });

    const batch = batches.find(b => b.id === ret.batchId);
    if (batch) {
      updateBatch(batch.id, {
        owner: 'SafeDestroy Facility',
        history: [
          ...batch.history,
          { date: new Date().toISOString(), action: 'Received by Manufacturer', actor: 'ABC Pharma' },
          { date: new Date().toISOString(), action: 'Sent for Destruction', actor: 'SafeDestroy Facility' }
        ]
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Returned Batches</h1>
        <p className="text-slate-500 mt-1">Manage incoming returns from distributors and dispatch them to authorized destruction facilities.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Truck size={20} className="text-blue-600" />
            Incoming from Distributors
          </h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {incomingReturns.map(ret => (
            <div key={ret.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Package className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{ret.medicine}</h4>
                  <div className="flex gap-4 mt-1 text-sm text-slate-600">
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">Batch: {ret.batchId}</span>
                    <span>Qty: {ret.receivedQuantity}</span>
                    <span>From: {ret.distributor}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link to={`/batch/${ret.batchId}`} className="text-blue-600 text-sm font-medium hover:underline">
                  Trace History
                </Link>
                <button 
                  onClick={() => handleReceiveAndSendToDestruction(ret.id)}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors flex items-center gap-2"
                >
                  Receive & Forward to Destruction <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}

          {incomingReturns.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No incoming returns at the moment.
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <ShieldCheck size={20} className="text-green-600" />
            Recently Processed & Forwarded
          </h2>
        </div>
        <div className="p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="pb-3">Batch ID</th>
                <th className="pb-3">Medicine</th>
                <th className="pb-3">Qty</th>
                <th className="pb-3">Facility</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pastReturns.map(ret => (
                <tr key={ret.id}>
                  <td className="py-3 font-mono text-sm text-slate-700">{ret.batchId}</td>
                  <td className="py-3 font-medium text-slate-800">{ret.medicine}</td>
                  <td className="py-3 text-slate-600">{ret.receivedQuantity}</td>
                  <td className="py-3 text-slate-600">SafeDestroy Facility</td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-600">
                      Forwarded
                    </span>
                  </td>
                </tr>
              ))}
              {pastReturns.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">No processed returns yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReturnedBatches;
