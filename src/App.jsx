import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LiveMap from './components/LiveMap';
import VoiceLibrary from './components/VoiceLibrary';
import RemindersManager from './components/RemindersManager';
import AlertCenter from './components/AlertCenter';
import VitalsDashboard from './components/VitalsDashboard';
import CaregiverCircle from './components/CaregiverCircle';
import { MapPin, Mic, Clock, ShieldAlert, Activity, Users, PhoneCall, X, Volume2, AlertTriangle, CheckCircle } from 'lucide-react';

import Login from './components/Login';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  const [incomingCallModal, setIncomingCallModal] = useState(false);
  const [callReason, setCallReason] = useState('Automatic Emergency Call - Fall Detected');
  
  // Theme Management
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply dark class to <html> so entire app (and map popups) inherit the theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Senior GPS & Geofence State
  const [seniorLocation, setSeniorLocation] = useState({
    name: 'Mr. Raghunath Pillai (Father)',
    lat: 8.8932,
    lng: 76.6141,
    homeLat: 8.8932,
    homeLng: 76.6141,
    address: 'TKMCE Campus, Kollam, Kerala - 691005'
  });
  const [safeZoneRadius, setSafeZoneRadius] = useState(500); // 500 meters
  const [isGeofenceActive, setIsGeofenceActive] = useState(true);

  // Voice Library Initial Clips
  const [voiceClips, setVoiceClips] = useState([
    {
      id: 1,
      title: 'Fall De-Escalation Anchor',
      category: 'Fall De-escalation',
      speaker: 'Son (Arjun)',
      duration: '4s',
      text: 'Dad, stay still! Help is on the way. You are completely safe.',
      isDefault: true
    },
    {
      id: 2,
      title: 'Anti-Removal Persuasion',
      category: 'Band Removal Persuasion',
      speaker: 'Daughter (Kavitha)',
      duration: '5s',
      text: 'Dad, please keep this neckband on. It keeps you connected with us.',
      isDefault: true
    },
    {
      id: 3,
      title: 'Morning Medication Clip',
      category: 'Medication Prompt',
      speaker: 'Spouse (Sumithra)',
      duration: '4s',
      text: 'Good morning! It is time to take your morning diabetes medicine.',
      isDefault: false
    },
    {
      id: 4,
      title: 'Hydration Prompt',
      category: 'Hydration Reminder',
      speaker: 'Grandchild (Advaith)',
      duration: '3s',
      text: 'Grandpa, drink a glass of water now to stay healthy!',
      isDefault: false
    }
  ]);

  // Scheduled Reminders Initial State
  const [reminders, setReminders] = useState([
    {
      id: 101,
      title: 'Morning Diabetes & Pressure Pill',
      time: '08:30',
      category: 'Medication',
      voiceTitle: 'Morning Medication Clip',
      voiceSpeaker: 'Spouse (Sumithra)',
      days: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun',
      active: true
    },
    {
      id: 102,
      title: 'Afternoon Hydration Goal (250ml)',
      time: '14:00',
      category: 'Hydration',
      voiceTitle: 'Hydration Prompt',
      voiceSpeaker: 'Grandchild (Advaith)',
      days: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun',
      active: true
    },
    {
      id: 103,
      title: 'Evening Walk in Garden',
      time: '17:30',
      category: 'Routine',
      voiceTitle: 'Fall De-Escalation Anchor',
      voiceSpeaker: 'Son (Arjun)',
      days: 'Mon, Wed, Fri',
      active: true
    }
  ]);

  // Alerts Initial State
  const [alerts, setAlerts] = useState([
    {
      id: 201,
      type: 'fall',
      title: 'FALL DETECTED (Center-of-Mass IMU)',
      description: 'Torso G-force impact 3.1G + Altitude drop 0.5m detected in Living Room.',
      voicePlayed: 'Dad, stay still! Help is on the way.',
      timestamp: 'Today, 10:30 AM',
      read: false
    },
    {
      id: 202,
      type: 'removal',
      title: 'Band Unclasped Notice',
      description: 'Magnetic throat clasp opened. Familial voice anchor triggered.',
      voicePlayed: 'Dad, please keep this neckband on.',
      timestamp: 'Yesterday, 04:15 PM',
      read: true
    }
  ]);

  // Vitals & Telemetry Data
  const [vitalsHistory] = useState([
    { time: '06:00', bpm: 68 },
    { time: '08:00', bpm: 72 },
    { time: '10:00', bpm: 88 },
    { time: '12:00', bpm: 75 },
    { time: '14:00', bpm: 70 },
    { time: '16:00', bpm: 78 },
    { time: '18:00', bpm: 74 }
  ]);

  // Caregivers State
  const [caregivers, setCaregivers] = useState([
    { id: 1, name: 'Arjun Krishnamurthy', relation: 'Son', phone: '+91 98470 12345', email: 'arjun@closeby.in', priority: 'Primary', isPrimary: true },
    { id: 2, name: 'Kavitha Venkataraman', relation: 'Daughter', phone: '+91 94471 67890', email: 'kavitha@gmail.com', priority: 'Secondary', isPrimary: false },
    { id: 3, name: 'Dr. Vikram Nambiar', relation: 'Primary Care Doctor', phone: '+91 98950 11223', email: 'dr.vikram@tkmce.ac.in', priority: 'Secondary', isPrimary: false }
  ]);

  // Simulator Handler: Fall Alert
  const handleSimulateFall = () => {
    // 1. Play real speech prompt in browser
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance("Dad, stay still! Help is on the way. You are completely safe.");
    speech.rate = 0.95;
    window.speechSynthesis.speak(speech);

    // 2. Add new alert log
    const newAlert = {
      id: Date.now(),
      type: 'fall',
      title: '🚨 SIMULATED FALL DETECTED',
      description: 'Torso G-force impact 3.4G + altitude drop detected near TKMCE campus.',
      voicePlayed: 'Dad, stay still! Help is on the way.',
      timestamp: 'Just now',
      read: false
    };

    setAlerts([newAlert, ...alerts]);
    setCallReason('Automatic Fall Emergency Call Triggered');
    setIncomingCallModal(true);
  };

  // Simulator Handler: Band Removal
  const handleSimulateRemoval = () => {
    // 1. Play speech prompt
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance("Dad, please keep this neckband on. It keeps you connected with us.");
    speech.rate = 0.95;
    window.speechSynthesis.speak(speech);

    // 2. Add alert log
    const newAlert = {
      id: Date.now(),
      type: 'removal',
      title: '⚠️ BAND UNCLASPED / REMOVED',
      description: 'Magnetic throat clasp unlatched. Familial voice persuasion activated.',
      voicePlayed: 'Dad, please keep this neckband on.',
      timestamp: 'Just now',
      read: false
    };

    setAlerts([newAlert, ...alerts]);
  };

  const handleMarkAsRead = (id) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSimulateFall={handleSimulateFall}
        onSimulateRemoval={handleSimulateRemoval}
        unreadAlertsCount={unreadAlertsCount}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 flex flex-col gap-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap ${
              activeTab === 'map'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>Live Location & Geofence</span>
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap ${
              activeTab === 'voice'
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Mic className="w-4 h-4 text-red-400" />
            <span>Familial Voice Library</span>
          </button>

          <button
            onClick={() => setActiveTab('reminders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap ${
              activeTab === 'reminders'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/30'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Timers & Reminders</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap relative ${
              activeTab === 'alerts'
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Emergency Alert Log</span>
            {unreadAlertsCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('vitals')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap ${
              activeTab === 'vitals'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Vitals Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('caregivers')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap ${
              activeTab === 'caregivers'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>Caregiver Circle</span>
          </button>
        </div>

        {/* Tab View Switching */}
        {activeTab === 'map' && (
          <LiveMap
            seniorLocation={seniorLocation}
            safeZoneRadius={safeZoneRadius}
            setSafeZoneRadius={setSafeZoneRadius}
            isGeofenceActive={isGeofenceActive}
            setIsGeofenceActive={setIsGeofenceActive}
          />
        )}

        {activeTab === 'voice' && (
          <VoiceLibrary
            voiceClips={voiceClips}
            setVoiceClips={setVoiceClips}
          />
        )}

        {activeTab === 'reminders' && (
          <RemindersManager
            reminders={reminders}
            setReminders={setReminders}
            voiceClips={voiceClips}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertCenter
            alerts={alerts}
            onMarkAsRead={handleMarkAsRead}
            onInitiateCall={() => {
              setCallReason('Manual Caregiver Call to Neckband');
              setIncomingCallModal(true);
            }}
          />
        )}

        {activeTab === 'vitals' && (
          <VitalsDashboard
            vitalsHistory={vitalsHistory}
            currentHeartRate={78}
            stepsCount={2410}
          />
        )}

        {activeTab === 'caregivers' && (
          <CaregiverCircle
            caregivers={caregivers}
            setCaregivers={setCaregivers}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-4 px-6 text-center text-xs text-slate-500 dark:text-slate-500">
        CloseBY Empathetic Eldercare Safety Hub • Team TKMCE
      </footer>

      {/* Incoming Emergency Call Modal */}
      {incomingCallModal && (
        <div className="fixed inset-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-colors duration-300">
          <div className="bg-white dark:bg-slate-900 border-2 border-red-500 rounded-3xl max-w-sm w-full p-6 shadow-2xl flex flex-col items-center text-center gap-5 relative animate-bounce-short">
            <button
              onClick={() => setIncomingCallModal(false)}
              className="absolute top-4 right-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center animate-ping">
              <PhoneCall className="w-8 h-8 text-red-500" />
            </div>

            <div>
                <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest bg-red-100 dark:bg-red-500/20 px-2 py-0.5 rounded border border-red-300 dark:border-red-500/30">
                {callReason}
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-2">CloseBY Neckband</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">Connecting 2-Way Cellular Audio Line...</p>
              <p className="text-[11px] text-emerald-400 font-semibold mt-2">📍 GPS Location: TKMCE Campus, Kollam</p>
            </div>

            <div className="flex items-center justify-center gap-4 w-full pt-2">
              <button
                onClick={() => setIncomingCallModal(false)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-red-950/50"
              >
                Decline
              </button>

              <button
                onClick={() => {
                  alert("Connected 2-Way Call to CloseBY Neckband!");
                  setIncomingCallModal(false);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Answer</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
