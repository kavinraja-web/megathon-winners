import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Trash2, FileBadge2, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const DestructionProcessing = () => {
  const { batches, updateBatch } = useAppContext();
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedCert, setGeneratedCert] = useState(null);

  const pendingBatches = batches.filter(b => b.owner === 'SafeDestroy Facility' && b.status !== 'DESTROYED');
  const destroyedBatches = batches.filter(b => b.owner === 'SafeDestroy Facility' && b.status === 'DESTROYED');

  const selectedBatch = pendingBatches.find(b => b.id === selectedBatchId);

  const handleDestroy = () => {
    if (!selectedBatch) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const certId = `CERT-${Math.floor(1000 + Math.random() * 9000)}-${selectedBatch.id.split('-')[1]}`;
      
      updateBatch(selectedBatch.id, {
        status: 'DESTROYED',
        currentQuantity: 0,
        certificateId: certId,
        history: [
          ...selectedBatch.history,
          { date: new Date().toISOString(), action: 'Destroyed', actor: 'SafeDestroy Facility', certificateId: certId }
        ]
      });

      setGeneratedCert({
        id: certId,
        batchId: selectedBatch.id,
        medicine: selectedBatch.medicine,
        date: new Date().toISOString()
      });
      setIsProcessing(false);
      setSelectedBatchId('');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Destruction Processing</h1>
        <p className="text-slate-500 mt-1">Execute verified destruction and generate digital compliance certificates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
             <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Trash2 size={20} className="text-slate-600" />
                Process Batch
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Pending Batch</label>
                <select 
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={selectedBatchId}
                  onChange={(e) => setSelectedBatchId(e.target.value)}
                  disabled={isProcessing}
                >
                  <option value="">-- Select a batch --</option>
                  {pendingBatches.map(b => (
                    <option key={b.id} value={b.id}>{b.medicine} ({b.id}) - Qty: {b.currentQuantity}</option>
                  ))}
                </select>
              </div>

              {selectedBatch && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">{selectedBatch.medicine}</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="text-slate-500">Batch ID:</div>
                    <div className="font-mono text-slate-800">{selectedBatch.id}</div>
                    <div className="text-slate-500">Quantity to Destroy:</div>
                    <div className="font-semibold text-slate-800">{selectedBatch.currentQuantity} units</div>
                    <div className="text-slate-500">Manufacturer:</div>
                    <div className="text-slate-800">{selectedBatch.manufacturer}</div>
                  </div>
                  
                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" className="mt-1 border-slate-300 rounded text-blue-600 focus:ring-blue-500" required />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        I hereby certify that the above quantities have been physically verified and are ready to undergo authorized thermal destruction in compliance with environmental and CDSCO regulations.
                      </span>
                    </label>
                  </div>
                  
                  <button 
                    onClick={handleDestroy}
                    disabled={isProcessing}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessing ? 'Processing Destruction...' : <><Trash2 size={18} /> Execute Destruction</>}
                  </button>
                </div>
              )}
            </div>
          </div>

          {generatedCert && (
             <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-4">
               <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <ShieldCheck size={32} />
               </div>
               <h3 className="text-green-800 font-bold text-xl mb-1">Destruction Complete</h3>
               <p className="text-green-700 text-sm mb-4">Batch {generatedCert.batchId} has been successfully destroyed.</p>
               
               <div className="bg-white border border-green-100 p-4 rounded-lg inline-block text-left w-full mb-4">
                 <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Digital Certificate ID</p>
                 <p className="font-mono font-bold text-lg text-slate-800">{generatedCert.id}</p>
                 <div className="mt-2 text-sm text-slate-600 flex justify-between">
                   <span>Date: {new Date(generatedCert.date).toLocaleDateString()}</span>
                   <span className="text-green-600 font-semibold flex items-center gap-1"><CheckCircle2 size={14}/> Verified</span>
                 </div>
               </div>

               <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2 mx-auto w-full">
                 <Download size={16} /> Download Digital Certificate
               </button>
             </div>
          )}
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <FileBadge2 size={20} className="text-blue-600" />
                Certificate Repository
              </h2>
            </div>
            
            <div className="divide-y divide-slate-100 h-[600px] overflow-y-auto">
              {destroyedBatches.map(batch => (
                <div key={batch.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-800">{batch.medicine}</h4>
                      <p className="text-xs text-slate-500 font-mono">Batch: {batch.id}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 border border-green-200 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                      <CheckCircle2 size={10} /> Destroyed
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3 p-2 bg-slate-50 border border-slate-100 rounded text-sm">
                    <span className="text-slate-500">Cert: <span className="font-mono font-medium text-slate-700">{batch.certificateId || 'N/A'}</span></span>
                    <Link to={`/batch/${batch.id}`} className="text-blue-600 font-medium hover:underline text-xs">Verify</Link>
                  </div>
                </div>
              ))}
              
              {destroyedBatches.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                  No certificates generated yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestructionProcessing;
