import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Store, Truck, Factory, Building2, LayoutDashboard, QrCode } from 'lucide-react';

const roles = [
  { name: 'Pharmacy', path: '/pharmacy', icon: Store, color: 'bg-blue-100 text-blue-600', description: 'Manage inventory, near-expiry sales, and returns.' },
  { name: 'Distributor', path: '/distributor', icon: Truck, color: 'bg-indigo-100 text-indigo-600', description: 'Handle return pickups and quantity verification.' },
  { name: 'Manufacturer', path: '/manufacturer', icon: Factory, color: 'bg-purple-100 text-purple-600', description: 'Track returned batches and monitor fraud.' },
  { name: 'Destruction Facility', path: '/facility', icon: Building2, color: 'bg-red-100 text-red-600', description: 'Process destruction and issue digital certificates.' },
  { name: 'Admin / Regulator', path: '/admin', icon: LayoutDashboard, color: 'bg-gray-100 text-gray-700', description: 'Global compliance and fraud monitoring console.' },
  { name: 'Global Scanner', path: '/scan', icon: QrCode, color: 'bg-green-100 text-green-600', description: 'Simulate barcode scanning and Re-entry Fraud.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <ShieldCheck className="mx-auto h-16 w-16 text-blue-600" />
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight">
          PharmaX
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Closed-Loop Pharmaceutical Traceability & Reverse-Chain Platform
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Select Role Dashboard</h3>
            <p className="mt-1 text-sm text-gray-500">Choose a persona to explore the prototype features.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <Link
                key={role.name}
                to={role.path}
                className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-col group"
              >
                <div className={`h-12 w-12 rounded-lg ${role.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <role.icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">{role.name}</h4>
                <p className="text-sm text-gray-500 flex-1">{role.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  Enter Portal <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
