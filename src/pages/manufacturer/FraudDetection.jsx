import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShieldAlert, MapPin, Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const FraudDetection = () => {
  const { alerts, batches } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fraud Detection System</h1>
          <p className="text-slate-500 mt-1">Monitor the network for re-entry attempts and supply chain anomalies.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search alerts..." 
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {alerts.map((alert) => {
          const batch = batches.find(b => b.id === alert.batchId);
          return (
            <div key={alert.id} className="bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
              <div className="p-4 bg-red-50 border-b border-red-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <ShieldAlert className="text-red-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-800 text-lg flex items-center gap-2">
                      🚨 RE-ENTRY ALERT
                      <span className="px-2 py-0.5 text-xs font-black uppercase bg-red-600 text-white rounded">Critical</span>
                    </h3>
                    <p className="text-sm text-red-600">{alert.message}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <p className="font-semibold text-slate-700">Detected on:</p>
                  <p>{new Date(alert.date).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Batch Information</h4>
                  {batch && (
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Medicine</p>
                        <p className="font-bold text-slate-800">{batch.medicine}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">Batch ID</p>
                          <p className="font-mono text-sm text-slate-800 bg-white px-2 py-1 rounded border border-slate-200 inline-block">{batch.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">Certificate</p>
                          <p className="font-mono text-sm text-slate-800 bg-white px-2 py-1 rounded border border-slate-200 inline-block">{batch.certificateId || 'N/A'}</p>
                        </div>
                      </div>
                      <Link to={`/batch/${batch.id}`} className="text-blue-600 text-sm hover:underline font-medium block mt-2">
                        View Full Traceability History &rarr;
                      </Link>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Conflict Timeline</h4>
                  <div className="relative border-l-2 border-slate-200 ml-3 space-y-6">
                    <div className="relative pl-6">
                      <div className="absolute w-4 h-4 rounded-full bg-green-500 -left-[9px] top-1 border-2 border-white"></div>
                      <p className="text-sm font-semibold text-slate-800">Legitimate Destruction</p>
                      <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Calendar size={12}/> {batch ? new Date(batch.history.find(h => h.action === 'Destroyed')?.date || '').toLocaleDateString() : 'Unknown'}</p>
                      <p className="text-sm text-slate-600 flex items-center gap-1"><MapPin size={14}/> SafeDestroy Facility</p>
                    </div>
                    
                    <div className="relative pl-6">
                      <div className="absolute w-4 h-4 rounded-full bg-red-500 -left-[9px] top-1 border-2 border-white animate-pulse"></div>
                      <p className="text-sm font-bold text-red-700">Fraudulent Re-entry</p>
                      <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Calendar size={12}/> {new Date(alert.date).toLocaleString()}</p>
                      <p className="text-sm text-slate-600 flex items-center gap-1"><MapPin size={14}/> Scanner Terminal A (Unauthorized)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors text-sm">
                  Mark as False Alarm
                </button>
                <button className="px-4 py-2 bg-slate-800 text-white font-medium hover:bg-slate-900 rounded-lg transition-colors text-sm">
                  Block Batch Globally
                </button>
                <button className="px-4 py-2 bg-red-600 text-white font-medium hover:bg-red-700 rounded-lg transition-colors text-sm">
                  Report to CDSCO
                </button>
              </div>
            </div>
          );
        })}

        {alerts.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <ShieldAlert size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">No Active Threats</h3>
            <p className="text-slate-500">The network is currently secure. No fraud alerts detected.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FraudDetection;
