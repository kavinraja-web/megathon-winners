import React from 'react';
import { ShieldAlert, Recycle, FlaskConical, AlertTriangle, Building2, TrendingUp } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const GlobalMonitoring = () => {
  const { alerts } = useAppContext();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Compliance & Recovery Monitoring</h1>
        <p className="text-slate-500 mt-1">Waste-to-value tracking and network integrity oversight.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recovery / Recycling Module */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white">
            <h2 className="text-lg font-semibold text-emerald-800 flex items-center gap-2">
              <Recycle size={20} className="text-emerald-600" />
              Waste-to-Value Recovery Module
            </h2>
          </div>
          
          <div className="p-6">
            <div className="flex justify-center mb-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-2 shadow-sm border border-slate-200">
                  <Building2 size={24} className="text-slate-600" />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Received Waste</span>
                <span className="font-bold text-lg text-slate-800">12,450 kg</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-200"></div>
              <div className="absolute top-6 left-1/4 right-1/4 h-0.5 bg-slate-200"></div>
              
              <div className="grid grid-cols-3 gap-4 pt-10">
                {/* Recovery */}
                <div className="text-center relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-slate-200"></div>
                  <div className="w-12 h-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <FlaskConical size={20} className="text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">API Recovery</h4>
                  <p className="text-xs text-slate-500 mb-2">Active ingredients extracted via safe chemical processes.</p>
                  <p className="font-bold text-blue-600 text-lg">1,240 kg</p>
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded uppercase font-bold">10% Yield</span>
                </div>

                {/* Recycling */}
                <div className="text-center relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-slate-200"></div>
                  <div className="w-12 h-12 mx-auto bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                    <Recycle size={20} className="text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Packaging Recycling</h4>
                  <p className="text-xs text-slate-500 mb-2">Plastics, glass, and cardboard sterilized and recycled.</p>
                  <p className="font-bold text-emerald-600 text-lg">4,850 kg</p>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded uppercase font-bold">39% Yield</span>
                </div>

                {/* Destruction */}
                <div className="text-center relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-slate-200"></div>
                  <div className="w-12 h-12 mx-auto bg-red-100 rounded-lg flex items-center justify-center mb-3">
                    <AlertTriangle size={20} className="text-red-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Thermal Destruction</h4>
                  <p className="text-xs text-slate-500 mb-2">Non-recoverable bio-hazard waste destroyed safely.</p>
                  <p className="font-bold text-red-600 text-lg">6,360 kg</p>
                  <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded uppercase font-bold">51% Yield</span>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-800">Estimated Economic Value Recovered</p>
                <p className="text-xs text-emerald-600">Based on current API and raw material market rates.</p>
              </div>
              <p className="text-2xl font-bold text-emerald-700 flex items-center gap-2">
                <TrendingUp size={24} /> ₹1.24 Cr
              </p>
            </div>
          </div>
        </div>

        {/* Global Fraud Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <ShieldAlert size={20} className="text-red-600" />
              Live Network Integrity Feed
            </h2>
          </div>
          
          <div className="p-6 space-y-4 h-[500px] overflow-y-auto">
            {alerts.map(alert => (
              <div key={alert.id} className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r-lg">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-red-800 text-sm">RE-ENTRY ATTEMPT BLOCKED</h4>
                  <span className="text-xs font-mono text-red-600">{new Date(alert.date).toLocaleTimeString()}</span>
                </div>
                <p className="text-sm text-red-700 mb-2">{alert.message}</p>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-white text-slate-600 text-[10px] font-bold border border-slate-200 rounded uppercase">Batch: {alert.batchId}</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold border border-red-200 rounded uppercase">Severity: {alert.severity}</span>
                </div>
              </div>
            ))}
            
            <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 rounded-r-lg opacity-60">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-yellow-800 text-sm">QUANTITY MISMATCH</h4>
                  <span className="text-xs font-mono text-yellow-600">Yesterday, 14:32</span>
                </div>
                <p className="text-sm text-yellow-700 mb-2">Discrepancy detected during distributor verification.</p>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-white text-slate-600 text-[10px] font-bold border border-slate-200 rounded uppercase">Distributor: Global Distributors</span>
                </div>
              </div>

               <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg opacity-60">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-blue-800 text-sm">SYSTEM AUDIT</h4>
                  <span className="text-xs font-mono text-blue-600">2 Days ago</span>
                </div>
                <p className="text-sm text-blue-700 mb-2">Automated compliance scan completed successfully.</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalMonitoring;
