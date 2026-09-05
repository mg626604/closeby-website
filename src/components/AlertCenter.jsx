import React from 'react';
import { AlertTriangle, ShieldAlert, PhoneCall, MapPin, CheckCircle, Clock, Volume2, ShieldOff } from 'lucide-react';

export default function AlertCenter({ alerts, onMarkAsRead, onInitiateCall }) {
  const alertTypeIcons = {
    fall: <AlertTriangle className="w-4 h-4 text-red-400" />,
    removal: <ShieldOff className="w-4 h-4 text-amber-400" />,
    geofence: <MapPin className="w-4 h-4 text-blue-400" />,
    battery: <ShieldAlert className="w-4 h-4 text-yellow-400" />
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-5 shadow-xl flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Real-Time Emergency Alerts & 2-Way Call Center</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Automated cellular SMS, live GPS coordinates, and de-escalation logs sent directly from CloseBY neckband.
          </p>
        </div>

        <button
          onClick={onInitiateCall}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-lg shadow-emerald-900/30"
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
          <span>Call CloseBY Neckband</span>
        </button>
      </div>

      {/* Alerts Feed */}
      <div className="flex flex-col gap-3">
        {alerts.length === 0 ? (
          <div className="text-center py-10 bg-white/60 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs">
            No emergency alerts logged. Everything is normal!
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                alert.read
                  ? 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  : 'bg-red-50 dark:bg-gradient-to-r dark:from-red-950/40 dark:to-slate-900 border-red-300 dark:border-red-500/40 text-slate-900 dark:text-white shadow-md shadow-red-100 dark:shadow-red-950/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 mt-0.5">
                  {alertTypeIcons[alert.type] || <AlertTriangle className="w-4 h-4 text-red-400" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{alert.title}</h3>
                    {!alert.read && (
                      <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        NEW UNREAD
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{alert.description}</p>
                  
                  {/* Local Voice Played Log */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400 mt-2">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <Volume2 className="w-3 h-3" />
                      Voice Anchor Played: "{alert.voicePlayed}"
                    </span>
                    <span>•</span>
                    <span className="text-slate-600 dark:text-slate-400">Time: {alert.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {!alert.read && (
                  <button
                    onClick={() => onMarkAsRead(alert.id)}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 transition-all"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Acknowledge</span>
                  </button>
                )}

                <button
                  onClick={onInitiateCall}
                  className="flex items-center gap-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Band</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
