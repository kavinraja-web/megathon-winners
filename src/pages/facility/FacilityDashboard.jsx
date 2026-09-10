import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Trash2, FileBadge2, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, bg }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-full ${bg} ${color} flex items-center justify-center shrink-0`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

const FacilityDashboard = () => {
  const { batches } = useAppContext();

  const myBatches = batches.filter(b => b.owner === 'SafeDestroy Facility');
  const pendingDestruction = myBatches.filter(b => b.status !== 'DESTROYED').length;
  const destroyedCount = myBatches.filter(b => b.status === 'DESTROYED').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Facility Dashboard</h1>
          <p className="text-slate-500 mt-1">Authorized destruction and digital certificate issuance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Batches Pending Destruction" value={pendingDestruction} icon={AlertTriangle} color="text-yellow-600" bg="bg-yellow-100" />
        <StatCard title="Total Batches Destroyed" value={destroyedCount} icon={Trash2} color="text-green-600" bg="bg-green-100" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <ArrowRightLeft size={20} className="text-slate-600" />
            Incoming Batches
          </h2>
          <Link to="/facility/destruction" className="text-sm font-medium text-blue-600 hover:underline">Go to Processing &rarr;</Link>
        </div>
        <div className="divide-y divide-slate-100">
          {myBatches.filter(b => b.status !== 'DESTROYED').map(batch => (
            <div key={batch.id} className="p-6 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800">{batch.medicine}</h4>
                <p className="text-sm text-slate-500">Batch: {batch.id} • Qty: {batch.currentQuantity}</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase">Pending Processing</span>
            </div>
          ))}
          {pendingDestruction === 0 && (
             <div className="p-8 text-center text-slate-500">
               No pending batches for destruction.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityDashboard;
