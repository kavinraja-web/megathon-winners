import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Truck, 
  Factory, 
  Trash2, 
  ShieldAlert, 
  LayoutDashboard,
  Search,
  Bell,
  ScanBarcode
} from 'lucide-react';
import ScannerModal from '../shared/ScannerModal';

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const DashboardLayout = () => {
  const location = useLocation();
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const getRoleNav = () => {
    if (location.pathname.startsWith('/pharmacy')) {
      return [
        { to: '/pharmacy', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/pharmacy/inventory', icon: Building2, label: 'Inventory' },
        { to: '/pharmacy/returns', icon: Truck, label: 'Returns' }
      ];
    }
    if (location.pathname.startsWith('/distributor')) {
      return [
        { to: '/distributor', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/distributor/returns', icon: Truck, label: 'Return Requests' }
      ];
    }
    if (location.pathname.startsWith('/manufacturer')) {
      return [
        { to: '/manufacturer', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/manufacturer/fraud', icon: ShieldAlert, label: 'Fraud Detection' },
        { to: '/manufacturer/batches', icon: Factory, label: 'Returned Batches' }
      ];
    }
    if (location.pathname.startsWith('/facility')) {
      return [
        { to: '/facility', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/facility/destruction', icon: Trash2, label: 'Destruction processing' }
      ];
    }
    if (location.pathname.startsWith('/admin')) {
      return [
        { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/admin/monitoring', icon: ShieldAlert, label: 'Global Monitoring' }
      ];
    }
    return [];
  };

  const navLinks = getRoleNav();
  const getRoleTitle = () => {
    const path = location.pathname.split('/')[1];
    return path.charAt(0).toUpperCase() + path.slice(1) + ' Portal';
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-blue-400">
            <ShieldAlert size={24} />
            <span className="text-xl font-bold tracking-wide">PharmaX</span>
          </div>
        </div>
        
        <div className="p-4 flex-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
            {getRoleTitle() || 'Navigation'}
          </div>
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <SidebarLink 
                key={link.to} 
                to={link.to} 
                icon={link.icon} 
                label={link.label} 
                active={location.pathname === link.to} 
              />
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-slate-800">
             <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
              Role Switcher (Demo)
            </div>
            <div className="space-y-1">
               <SidebarLink to="/pharmacy" icon={Building2} label="Pharmacy" active={location.pathname.startsWith('/pharmacy')} />
               <SidebarLink to="/distributor" icon={Truck} label="Distributor" active={location.pathname.startsWith('/distributor')} />
               <SidebarLink to="/manufacturer" icon={Factory} label="Manufacturer" active={location.pathname.startsWith('/manufacturer')} />
               <SidebarLink to="/facility" icon={Trash2} label="Destruction Fac." active={location.pathname.startsWith('/facility')} />
               <SidebarLink to="/admin" icon={ShieldAlert} label="Admin / Regulator" active={location.pathname.startsWith('/admin')} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="text-lg font-semibold text-slate-800">
            {getRoleTitle()}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search batches..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none w-64"
              />
            </div>
            <button 
              onClick={() => setIsScannerOpen(true)}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Simulate Scan"
            >
              <ScanBarcode size={20} />
            </button>
            <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm ml-2">
              U
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
      
      {isScannerOpen && (
        <ScannerModal onClose={() => setIsScannerOpen(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;
