import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { 
  Package, 
  Calendar, 
  Building2, 
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Trash2
} from 'lucide-react';

const BatchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { batches } = useAppContext();
  
  const batch = batches.find(b => b.id === id);

  if (!batch) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-slate-700">Batch Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 hover:underline">Go Back</button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'SAFE': return 'bg-green-100 text-green-700 border-green-200';
      case 'NEAR_EXPIRY': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'EXPIRED': return 'bg-red-100 text-red-700 border-red-200';
      case 'DESTROYED': return 'bg-slate-200 text-slate-700 border-slate-300';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">{batch.medicine}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1 font-mono">
                <Package size={14} /> {batch.id}
              </span>
              <span className="flex items-center gap-1">
                <Building2 size={14} /> {batch.manufacturer}
              </span>
            </div>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(batch.status)}`}>
            {batch.status.replace('_', ' ')}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 border-b border-slate-100">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Manufactured</p>
            <p className="font-medium text-slate-800">{new Date(batch.manufacturedDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Expiry Date</p>
            <p className="font-medium text-slate-800 flex items-center gap-1">
              {batch.status === 'NEAR_EXPIRY' && <AlertTriangle size={14} className="text-yellow-500" />}
              {new Date(batch.expiryDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Original Qty</p>
            <p className="font-medium text-slate-800">{batch.originalQuantity} units</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Current Qty</p>
            <p className="font-medium text-slate-800">{batch.currentQuantity} units</p>
          </div>
        </div>

        {batch.certificateId && (
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="font-semibold text-green-800">Verified Destruction</p>
                <p className="text-sm text-slate-500 font-mono">Cert: {batch.certificateId}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              View Certificate
            </button>
          </div>
        )}

        {/* Timeline */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Traceability Timeline</h3>
          <div className="space-y-6">
            {batch.history.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 
                    ${index === batch.history.length - 1 ? 'bg-blue-100 text-blue-600 border-2 border-white ring-4 ring-blue-50' : 'bg-slate-100 text-slate-500'}`}
                  >
                    {event.action === 'Destroyed' ? <Trash2 size={14} /> : 
                     event.action === 'Manufactured' ? <Factory size={14} /> :
                     <CheckCircle2 size={14} />}
                  </div>
                  {index < batch.history.length - 1 && (
                    <div className="w-0.5 h-full bg-slate-200 mt-2"></div>
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-sm text-slate-500 mb-1 flex items-center gap-2">
                    <Calendar size={12} />
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="font-semibold text-slate-800">{event.action}</p>
                  <p className="text-sm text-slate-600">{event.actor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
