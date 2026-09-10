import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePharma } from '../context/PharmaContext';
import { QrCode, Search, ArrowLeft, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function Scanner() {
  const navigate = useNavigate();
  const { scanBatch } = usePharma();
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState(null);

  const handleScan = (e) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    // Simulate scanning from a random pharmacy to trigger re-entry fraud if destroyed
    const result = scanBatch(scanInput.trim(), 'Pharmacy Downtown');
    setScanResult(result);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <header className="p-6 flex items-center border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold tracking-wide flex items-center">
          <QrCode className="h-6 w-6 mr-2 text-blue-400" />
          Global Scanner Endpoint
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl relative overflow-hidden">
            
            {/* Scanning animation lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite_alternate]"></div>
            </div>

            <div className="relative z-10 text-center mb-8">
              <div className="mx-auto h-24 w-24 border-4 border-dashed border-gray-600 rounded-xl flex items-center justify-center mb-4 bg-gray-900">
                <QrCode className="h-12 w-12 text-gray-500" />
              </div>
              <h2 className="text-xl font-medium text-gray-200">Ready to Scan</h2>
              <p className="text-gray-400 text-sm mt-1">Enter batch number manually or use barcode scanner</p>
            </div>

            <form onSubmit={handleScan} className="relative z-10">
              <div className="relative">
                <input
                  type="text"
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  placeholder="e.g. PCM-78421"
                  className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono text-lg uppercase tracking-wider"
                />
                <button type="submit" className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 flex items-center transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Hint for Demo */}
            <div className="mt-6 p-3 bg-blue-900/30 border border-blue-800 rounded-lg relative z-10">
              <p className="text-xs text-blue-300 text-center font-medium">
                Demo Hint: Scan <span className="font-mono text-white bg-blue-900 px-1 py-0.5 rounded">PCM-78421</span> after it has been destroyed to trigger the Re-entry Fraud Alert.
              </p>
            </div>

            {scanResult && !scanResult.alert && (
              <div className="mt-8 pt-6 border-t border-gray-700 relative z-10 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center text-green-400 mb-4">
                  <CheckCircle2 className="h-6 w-6 mr-2" />
                  <span className="font-bold">Batch Verified</span>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-500">Medicine</span>
                    <span className="text-gray-200">{scanResult.batch.medicine}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-500">Status</span>
                    <span className="text-gray-200">{scanResult.batch.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current Loc</span>
                    <span className="text-gray-200">{scanResult.batch.currentLocation}</span>
                  </div>
                </div>
              </div>
            )}
            
            {scanResult === null && scanInput !== '' && !scanResult && (
              <div className="mt-8 pt-6 border-t border-gray-700 relative z-10 text-center">
                <p className="text-gray-500 text-sm">Awaiting scan input...</p>
              </div>
            )}

            {scanResult === null && scanInput !== '' && scanResult === false && (
               <div className="mt-8 pt-6 border-t border-gray-700 relative z-10 animate-in fade-in slide-in-from-bottom-4">
                 <div className="flex items-center text-red-400">
                   <ShieldAlert className="h-6 w-6 mr-2" />
                   <span className="font-bold">Batch Not Found</span>
                 </div>
               </div>
            )}
          </div>
        </div>
      </main>

      {/* Tailwind custom animation for scanner */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}} />
    </div>
  );
}
