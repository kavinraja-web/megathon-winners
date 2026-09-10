import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShieldAlert, Users, Package, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  { name: 'Jan', destroyed: 4000, recovered: 2400 },
  { name: 'Feb', destroyed: 3000, recovered: 1398 },
  { name: 'Mar', destroyed: 2000, recovered: 9800 },
  { name: 'Apr', destroyed: 2780, recovered: 3908 },
  { name: 'May', destroyed: 1890, recovered: 4800 },
  { name: 'Jun', destroyed: 2390, recovered: 3800 },
  { name: 'Jul', destroyed: 3490, recovered: 4300 },
];

const AdminDashboard = () => {
  const { batches, alerts } = useAppContext();

  const totalDestroyed = batches.filter(b => b.status === 'DESTROYED').length * 1500; // Fake multiplier for volume
  const totalFraud = alerts.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Regulator Console</h1>
          <p className="text-slate-500 mt-1">High-level national overview of reverse-chain operations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Network Nodes" value="1,248" icon={Users} color="text-blue-600" bg="bg-blue-100" />
        <StatCard title="Units Destroyed (YTD)" value={`${totalDestroyed.toLocaleString()}`} icon={Package} color="text-green-600" bg="bg-green-100" />
        <StatCard title="Material Recovered (kg)" value="45,210" icon={TrendingUp} color="text-purple-600" bg="bg-purple-100" />
        <StatCard title="Active Fraud Alerts" value={totalFraud} icon={ShieldAlert} color="text-red-600" bg="bg-red-100" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">National Waste Processing Volume</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDestroyed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <Tooltip cursor={{stroke: '#cbd5e1', strokeWidth: 1}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Area type="monotone" dataKey="destroyed" stroke="#ef4444" fillOpacity={1} fill="url(#colorDestroyed)" name="Thermal Destruction" />
              <Area type="monotone" dataKey="recovered" stroke="#22c55e" fillOpacity={1} fill="url(#colorRecovered)" name="Material Recovery" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
