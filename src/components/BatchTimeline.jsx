import React from 'react';
import { CheckCircle2, Clock, Truck, ShieldAlert } from 'lucide-react';

export default function BatchTimeline({ history }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {history.map((event, eventIdx) => {
          const isLast = eventIdx === history.length - 1;
          const isDestroyed = event.action === 'Destroyed';
          
          let Icon = CheckCircle2;
          let iconColor = 'text-gray-400';
          let bgColor = 'bg-gray-100';

          if (isDestroyed) {
            Icon = ShieldAlert;
            iconColor = 'text-green-600';
            bgColor = 'bg-green-100';
          } else if (event.action.includes('Transit') || event.action.includes('Pick')) {
            Icon = Truck;
            iconColor = 'text-blue-500';
            bgColor = 'bg-blue-100';
          } else if (isLast) {
            Icon = Clock;
            iconColor = 'text-blue-500';
            bgColor = 'bg-blue-100';
          }

          return (
            <li key={event.step}>
              <div className="relative pb-8">
                {!isLast ? (
                  <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${bgColor}`}>
                      <Icon className={`h-4 w-4 ${iconColor}`} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">
                        {event.action} <span className="font-medium text-gray-900">at {event.org}</span>
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <time dateTime={event.date}>{event.date}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
