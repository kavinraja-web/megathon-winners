import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { usePharma } from '../context/PharmaContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ShieldCheck, Package, Store, Factory, AlertOctagon } from 'lucide-react';

const mockChartData = [
  { name: 'Jan', returns: 4000, destroyed: 2400 },
  { name: 'Feb', returns: 3000, destroyed: 1398 },
  { name: 'Mar', returns: 2000, destroyed: 9800 },
  { name: 'Apr', returns: 2780, destroyed: 3908 },
  { name: 'May', returns: 1890, destroyed: 4800 },
  { name: 'Jun', returns: 2390, destroyed: 3800 },
  { name: 'Jul', returns: 3490, destroyed: 4300 },
];

export default function AdminDashboard() {
  const { batches, alerts } = usePharma();

  return (
    <DashboardLayout role="admin" title="Regulatory Compliance Monitor">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { name: 'Registered Pharmacies', value: 1245, icon: Store, color: 'text-blue-600' },
          { name: 'Manufacturers', value: 87, icon: Factory, color: 'text-indigo-600' },
          { name: 'Total Returns', value: '45.2K', icon: Package, color: 'text-purple-600' },
          { name: 'Verified Destructions', value: '38.1K', icon: ShieldCheck, color: 'text-green-600' },
          { name: 'Active Fraud Alerts', value: alerts.length, icon: AlertOctagon, color: 'text-red-600' }
        ].map((stat) => (
          <div key={stat.name} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className={`mb-3 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-6 uppercase tracking-wider">Volume: Returns vs Destruction</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} />
                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="returns" name="Returns Initiated" fill="#818CF8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="destroyed" name="Batches Destroyed" fill="#34D399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-6 uppercase tracking-wider">System Compliance Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} domain={[0, 10000]} />
                <Tooltip cursor={{stroke: '#D1D5DB', strokeWidth: 1, strokeDasharray: '5 5'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Line type="monotone" dataKey="returns" stroke="#F87171" strokeWidth={3} dot={{r: 4, fill: '#F87171', strokeWidth: 0}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-red-200 bg-red-50 flex items-center justify-between">
          <div className="flex items-center">
            <AlertOctagon className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-bold text-red-800">Critical Fraud Alerts</h3>
          </div>
          <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{alerts.length} Active</span>
        </div>
        
        {alerts.length === 0 ? (
          <div className="p-8 text-center">
            <ShieldCheck className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-900 font-medium">System Secure</p>
            <p className="text-gray-500 text-sm">No fraud alerts detected in the network.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Detected</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-red-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-mono text-gray-900">{alert.batchId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Re-entry Fraud
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.detectedLocation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Investigate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
