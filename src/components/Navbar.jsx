import React from 'react';
import { Shield, Battery, Signal, Bell, PhoneCall, AlertTriangle, UserCheck, Heart, Moon, Sun } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onSimulateFall, onSimulateRemoval, unreadAlertsCount, isDarkMode, setIsDarkMode }) {
  return (
    <header className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-300 dark:border-slate-700/80 sticky top-0 z-50 px-4 lg:px-8 py-3 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Device Status */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="h-[52px] flex items-center justify-center">
              <img src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"} alt="CloseBY Logo" className="h-full w-auto object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">CloseBY</h1>
                <span className="bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-red-500/30">
                  Family Care
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400">Empathetic Eldercare Safety Hub</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-3 bg-white/80 dark:bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-300/50 dark:border-slate-700/50 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Connected
            </div>
            <div className="h-3 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
              <span>88%</span>
            </div>
            <div className="h-3 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
              <Signal className="w-3.5 h-3.5 text-blue-400" />
              <span>4G LTE</span>
            </div>
          </div>
        </div>

        {/* Action Simulators */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={onSimulateFall}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all shadow-md shadow-red-900/30 border border-red-500/30"
          >
            <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
            <span>Simulate Fall</span>
          </button>
          
          <button
            onClick={onSimulateRemoval}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-amber-600/90 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all shadow-md shadow-amber-900/30 border border-amber-500/30"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Simulate Band Removal</span>
          </button>

          <div className="relative flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg transition-all bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`p-2 rounded-lg border transition-all ${
                activeTab === 'alerts'
                  ? 'bg-slate-200 dark:bg-slate-700 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-white'
                  : 'bg-white dark:bg-slate-900/60 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Emergency Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Device Status */}
      <div className="flex sm:hidden items-center justify-between bg-white/80 dark:bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-300/50 dark:border-slate-700/50 text-xs mt-3">
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Connected
        </div>
        <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
          <Battery className="w-3.5 h-3.5 text-emerald-400" />
          <span>88%</span>
        </div>
        <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
          <Signal className="w-3.5 h-3.5 text-blue-400" />
          <span>4G LTE</span>
        </div>
      </div>
    </header>
  );
}
