import React from 'react';
import { AlertOctagon, X, MapPin, Calendar, Activity } from 'lucide-react';
import { usePharma } from '../context/PharmaContext';

export default function FraudAlertModal() {
  const { fraudModalOpen, currentFraudAlert, closeFraudModal } = usePharma();

  if (!fraudModalOpen || !currentFraudAlert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border-2 border-red-500 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-full mr-4">
              <AlertOctagon className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-700">RE-ENTRY ALERT</h2>
              <p className="text-red-600/80 text-sm font-medium">Critical Security Violation Detected</p>
            </div>
          </div>
          <button onClick={closeFraudModal} className="text-red-400 hover:text-red-600 transition-colors p-1">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Batch Number</p>
                <p className="font-mono font-bold text-gray-900 text-lg">{currentFraudAlert.batchId}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Medicine</p>
                <p className="font-semibold text-gray-900">{currentFraudAlert.medicine}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="mt-0.5 mr-3">
                <div className="h-2 w-2 rounded-full bg-green-500 ring-4 ring-green-100"></div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Previous Legal Status</p>
                <p className="text-sm font-medium text-gray-900 flex items-center mt-1">
                  DESTROYED <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Verified</span>
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-0.5 mr-3">
                <div className="h-2 w-2 rounded-full bg-red-500 ring-4 ring-red-100"></div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Current Scan Location</p>
                <p className="text-sm font-medium text-red-600 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" /> {currentFraudAlert.detectedLocation}
                </p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" /> {currentFraudAlert.date}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <h3 className="text-sm font-bold text-red-800 mb-1 flex items-center">
              <Activity className="h-4 w-4 mr-2" /> Risk Assessment
            </h3>
            <p className="text-sm text-red-700">
              A batch previously recorded and verified as DESTROYED has re-entered the supply chain. This indicates a high likelihood of counterfeit entry or facility compliance failure.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button onClick={closeFraudModal} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Dismiss
          </button>
          <button className="px-4 py-2 bg-red-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Report to Regulator
          </button>
        </div>
      </div>
    </div>
  );
}
