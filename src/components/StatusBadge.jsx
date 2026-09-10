import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function StatusBadge({ status, className }) {
  const getStatusStyles = (s) => {
    switch (s) {
      case 'SAFE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'NEAR EXPIRY':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'EXPIRED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'RETURN_INITIATED':
      case 'PENDING_PICKUP':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'IN_TRANSIT':
      case 'IN_TRANSIT_MANUFACTURER':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'RECEIVED_MANUFACTURER':
      case 'PENDING_DESTRUCTION':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'DESTROYED':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formattedStatus = status.replace(/_/g, ' ');

  return (
    <span className={twMerge(
      clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', getStatusStyles(status)),
      className
    )}>
      {formattedStatus}
    </span>
  );
}
