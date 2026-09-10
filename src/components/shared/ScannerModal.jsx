import React, { useState } from 'react';
import { X, ScanLine, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const ScannerModal = ({ onClose }) => {
  const { simulateScan } = useAppContext();
  const [batchId, setBatchId] = useState('');
  const [result, setResult] = useState(null);

  const handleScan = (e) => {
    e.preventDefault();
    if (!batchId) return;
    
    // Simulate API delay
    setResult('scanning');
    setTimeout(() => {
      const scanResult = simulateScan(batchId, 'Scanner Terminal A');
      setResult(scanResult);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <ScanLine size={18} className="text-blue-600" />
            Scanner Simulation
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {!result && (
            <form onSubmit={handleScan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Enter Batch Number (e.g., AZT-55231)
                </label>
                <input
                  type="text"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Scan or type here..."
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
              >
                Simulate Scan
              </button>
              
              <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 font-semibold mb-2 uppercase">Demo Batch IDs:</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li><span className="font-mono bg-white border border-slate-200 px-1 rounded">PCM-78421</span> - Near Expiry</li>
                  <li><span className="font-mono bg-white border border-slate-200 px-1 rounded">AZT-55231</span> - 🚨 Destroyed (Triggers Fraud)</li>
                </ul>
              </div>
            </form>
          )}

          {result === 'scanning' && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative">
                <ScanLine size={48} className="text-blue-500 animate-pulse" />
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-[scan_1s_ease-in-out_infinite_alternate]"></div>
              </div>
              <p className="mt-4 text-slate-600 font-medium">Scanning network database...</p>
            </div>
          )}

          {result && typeof result === 'object' && (
            <div className="py-4">
              {result.isFraud ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle size={32} />
                  </div>
                  <h4 className="text-red-700 font-bold text-lg mb-1">🚨 CRITICAL FRAUD ALERT</h4>
                  <p className="text-red-600 text-sm mb-4">
                    Batch <strong>{result.batch.id}</strong> was previously recorded as DESTROYED. Re-entry detected!
                  </p>
                  <button 
                    onClick={onClose}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 w-full"
                  >
                    Investigate
                  </button>
                </div>
              ) : result.batch ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-green-700 font-bold text-lg mb-1">Batch Verified</h4>
                  <p className="text-green-600 text-sm mb-4">
                    {result.batch.medicine} (Batch: {result.batch.id}) is valid. Status: {result.batch.status}.
                  </p>
                  <button 
                    onClick={() => {
                      setResult(null);
                      setBatchId('');
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 w-full mb-2"
                  >
                    Scan Another
                  </button>
                   <button 
                    onClick={onClose}
                    className="text-slate-500 font-medium text-sm hover:text-slate-700"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-slate-600 mb-4">Batch not found in the system.</p>
                  <button 
                    onClick={() => {
                      setResult(null);
                      setBatchId('');
                    }}
                    className="bg-slate-200 text-slate-800 px-6 py-2 rounded-lg font-medium hover:bg-slate-300"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScannerModal;
