import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Activity, AlertTriangle, ShieldCheck, FileText, Search, UserCircle, Bell, ArrowRightLeft } from 'lucide-react';
import { usePharma } from '../context/PharmaContext';

export default function DashboardLayout({ children, role, title }) {
  const location = useLocation();
  const { alerts } = usePharma();
  const activeAlerts = alerts.filter(a => a.risk === 'CRITICAL').length;

  const getNavItems = () => {
    switch(role) {
      case 'pharmacy':
        return [
          { name: 'Dashboard', path: '/pharmacy', icon: LayoutDashboard },
          { name: 'Inventory', path: '/pharmacy/inventory', icon: Package },
          { name: 'Returns', path: '/pharmacy/returns', icon: ArrowRightLeft },
        ];
      case 'distributor':
        return [
          { name: 'Dashboard', path: '/distributor', icon: LayoutDashboard },
          { name: 'Return Requests', path: '/distributor/returns', icon: ArrowRightLeft },
        ];
      case 'manufacturer':
        return [
          { name: 'Dashboard', path: '/manufacturer', icon: LayoutDashboard },
          { name: 'Traceability', path: '/manufacturer/traceability', icon: Activity },
          { name: 'Fraud Alerts', path: '/manufacturer/alerts', icon: AlertTriangle },
        ];
      case 'facility':
        return [
          { name: 'Dashboard', path: '/facility', icon: LayoutDashboard },
          { name: 'Incoming Batches', path: '/facility/incoming', icon: Package },
          { name: 'Certificates', path: '/facility/certificates', icon: FileText },
        ];
      case 'admin':
        return [
          { name: 'Overview', path: '/admin', icon: LayoutDashboard },
          { name: 'Fraud Monitoring', path: '/admin/fraud', icon: ShieldCheck },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <ShieldCheck className="h-8 w-8 text-blue-600 mr-2" />
          <span className="text-xl font-bold tracking-tight text-gray-900">PharmaX</span>
        </div>
        
        <div className="px-6 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {role.toUpperCase()} PORTAL
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== `/${role}`);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link to="/" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Switch Role
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          
          <div className="flex items-center space-x-4">
            <Link to="/scan" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Global Scanner">
              <Search className="h-5 w-5" />
            </Link>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell className="h-5 w-5" />
              {activeAlerts > 0 && (
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              )}
            </button>
            
            <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
              <UserCircle className="h-8 w-8 text-gray-400" />
              <div className="hidden sm:block text-sm">
                <p className="font-medium text-gray-700 capitalize">{role} User</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
