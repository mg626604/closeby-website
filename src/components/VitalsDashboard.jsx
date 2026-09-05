import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Heart, Activity, Battery, Footprints, Thermometer, ShieldCheck } from 'lucide-react';

export default function VitalsDashboard({ vitalsHistory, currentHeartRate, stepsCount }) {
  return (
    <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-5 shadow-xl flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Vitals & Telemetry Analytics</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            MAX30102-based heart-rate & SpO₂ monitoring with activity tracking. Demo monitoring values only.
          </p>
        </div>

        <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-500/30">
          Vitals Normal
        </span>
      </div>

      {/* Top 3 Stat Cards (SpO2 removed) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Heart Rate */}
        <div className="bg-white/90 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Heart Rate</span>
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
              <Heart className="w-4 h-4 fill-rose-400 animate-pulse" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">{currentHeartRate} <span className="text-xs font-normal text-slate-600 dark:text-slate-400">BPM</span></div>
            <span className="text-[11px] text-emerald-400 font-medium mt-1 block">Resting normal (60-90)</span>
          </div>
        </div>

        {/* Daily Steps */}
        <div className="bg-white/90 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Daily Activity</span>
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Footprints className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">{stepsCount.toLocaleString()} <span className="text-xs font-normal text-slate-600 dark:text-slate-400">steps</span></div>
            <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium mt-1 block">Target: 3,000 steps</span>
          </div>
        </div>

        {/* Battery & Hardware */}
        <div className="bg-white/90 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-700/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Neckband Runtime</span>
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Battery className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">88% <span className="text-xs font-normal text-slate-600 dark:text-slate-400">(42h left)</span></div>
            <span className="text-[11px] text-emerald-400 font-medium mt-1 block">1200mAh Li-Po Battery • Demo value</span>
          </div>
        </div>

      </div>

      {/* Recharts Area Chart for Heart Rate */}
      <div className="bg-white/80 dark:bg-slate-900/60 border border-slate-300/60 dark:border-slate-700/60 rounded-xl p-4 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Today's Heart Rate & Vitals Trend</h3>
        
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={vitalsHistory}>
              <defs>
                <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis domain={[50, 110]} stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, #ffffff)',
                  borderColor: 'var(--tooltip-border, #cbd5e1)',
                  borderRadius: '0.5rem',
                  color: 'var(--tooltip-fg, #0f172a)'
                }}
              />
              <Area type="monotone" dataKey="bpm" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorBpm)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
