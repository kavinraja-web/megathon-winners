import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Truck, CheckCircle2, AlertTriangle, ArrowRightLeft } from 'lucide-react';
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

const DistributorDashboard = () => {
  const { returns } = useAppContext();

  const myReturns = returns.filter(r => r.distributor === 'Global Distributors');
  const pendingRequests = myReturns.filter(r => r.status === 'PENDING_VERIFICATION').length;
  const verifiedRequests = myReturns.filter(r => r.status === 'VERIFIED').length;
  const transitRequests = myReturns.filter(r => r.status === 'IN_TRANSIT_TO_MFG').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Distributor Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage return pickups and verify physical quantities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Pending Verification" value={pendingRequests} icon={AlertTriangle} color="text-yellow-600" bg="bg-yellow-100" />
        <StatCard title="Verified & Ready" value={verifiedRequests} icon={CheckCircle2} color="text-green-600" bg="bg-green-100" />
        <StatCard title="In Transit to Mfg" value={transitRequests} icon={Truck} color="text-blue-600" bg="bg-blue-100" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-800">Action Required: Pickups & Verification</h2>
          <Link to="/distributor/returns" className="text-sm font-medium text-blue-600 hover:underline">View All</Link>
        </div>
        
        <div className="divide-y divide-slate-100">
          {myReturns.filter(r => r.status === 'PENDING_VERIFICATION').map((ret) => (
            <div key={ret.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <ArrowRightLeft className="text-slate-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{ret.pharmacy}</h4>
                  <p className="text-sm text-slate-500">Return Request: {ret.id} • {ret.medicine}</p>
                  <p className="text-xs text-slate-400 mt-1">Declared Qty: {ret.declaredQuantity}</p>
                </div>
              </div>
              <Link 
                to={`/distributor/returns?verify=${ret.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Verify Quantity
              </Link>
            </div>
          ))}

          {myReturns.filter(r => r.status === 'PENDING_VERIFICATION').length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No pending verifications at this time.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;
