import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Package, AlertTriangle, ArrowRightLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const chartData = [
  { name: 'Apr', returns: 4 },
  { name: 'May', returns: 3 },
  { name: 'Jun', returns: 7 },
  { name: 'Jul', returns: 5 },
  { name: 'Aug', returns: 12 },
  { name: 'Sep', returns: 2 }
];

const PharmacyDashboard = () => {
  const { batches, returns } = useAppContext();

  const myBatches = batches.filter(b => b.owner === 'Pharmacy XYZ' || b.history.some(h => h.actor === 'Pharmacy XYZ'));
  
  const activeInventory = myBatches.filter(b => b.currentQuantity > 0);
  const nearExpiryCount = activeInventory.filter(b => b.status === 'NEAR_EXPIRY').length;
  const expiredCount = activeInventory.filter(b => b.status === 'EXPIRED').length;
  
  const pendingReturns = returns.filter(r => r.pharmacy === 'Pharmacy XYZ' && r.status !== 'COMPLETED').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pharmacy Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of your inventory and reverse-chain activity.</p>
        </div>
        <Link to="/pharmacy/returns" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Initiate Return
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Active Batches" value={activeInventory.length} icon={Package} color="text-blue-600" bg="bg-blue-100" />
        <StatCard title="Near Expiry" value={nearExpiryCount} icon={AlertTriangle} color="text-yellow-600" bg="bg-yellow-100" />
        <StatCard title="Expired Stock" value={expiredCount} icon={AlertTriangle} color="text-red-600" bg="bg-red-100" />
        <StatCard title="Pending Returns" value={pendingReturns} icon={ArrowRightLeft} color="text-purple-600" bg="bg-purple-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Returns History</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="returns" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
            <Link to="/pharmacy/returns" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {returns.slice(0, 4).map((ret, i) => (
              <div key={i} className="flex gap-3 items-start border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                  <ArrowRightLeft size={14} className="text-slate-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800 text-sm">Return {ret.id} created</p>
                  <p className="text-xs text-slate-500 mb-1">{ret.medicine}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {ret.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
            {returns.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No recent activity.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
