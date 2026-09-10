import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Factory, ShieldAlert, CheckCircle2, ArrowRightLeft } from 'lucide-react';
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

const ManufacturerDashboard = () => {
  const { returns, alerts } = useAppContext();

  const myReturns = returns.filter(r => r.distributor === 'Global Distributors'); // Mock condition for this mfg
  const incomingBatches = myReturns.filter(r => r.status === 'IN_TRANSIT_TO_MFG').length;
  const completedReturns = myReturns.filter(r => r.status === 'COMPLETED').length;
  const criticalAlerts = alerts.filter(a => a.severity === 'CRITICAL').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manufacturer Dashboard</h1>
          <p className="text-slate-500 mt-1">Oversee compliance, fraud alerts, and return processing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Incoming Returns" value={incomingBatches} icon={ArrowRightLeft} color="text-blue-600" bg="bg-blue-100" />
        <StatCard title="Destroyed / Closed" value={completedReturns} icon={CheckCircle2} color="text-green-600" bg="bg-green-100" />
        <StatCard title="Critical Fraud Alerts" value={criticalAlerts} icon={ShieldAlert} color="text-red-600" bg="bg-red-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">Recent Fraud Alerts</h2>
            <Link to="/manufacturer/fraud" className="text-sm font-medium text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="p-6 space-y-4">
            {alerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex gap-4 p-4 rounded-lg bg-red-50 border border-red-100">
                <ShieldAlert className="text-red-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-red-800 mb-1">{alert.type} ALERT - {alert.severity}</h4>
                  <p className="text-sm text-red-700">{alert.message}</p>
                  <p className="text-xs text-red-500 mt-2 font-mono">{new Date(alert.date).toLocaleString()}</p>
                </div>
              </div>
            ))}
            {alerts.length === 0 && <p className="text-slate-500 text-sm">No recent alerts.</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">Batches Awaiting Action</h2>
            <Link to="/manufacturer/batches" className="text-sm font-medium text-blue-600 hover:underline">Manage</Link>
          </div>
          <div className="p-6 space-y-4">
            {myReturns.filter(r => r.status === 'IN_TRANSIT_TO_MFG').slice(0, 4).map((ret) => (
              <div key={ret.id} className="flex justify-between items-center pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold text-slate-800">{ret.medicine}</p>
                  <p className="text-sm text-slate-500">From: {ret.distributor}</p>
                </div>
                <Link 
                  to="/manufacturer/batches" 
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded transition-colors"
                >
                  Review
                </Link>
              </div>
            ))}
            {myReturns.filter(r => r.status === 'IN_TRANSIT_TO_MFG').length === 0 && (
              <p className="text-slate-500 text-sm">No pending batches.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerDashboard;
