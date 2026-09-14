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
  const [callReason, setCallReason] = useState('AUTOMATIC FALL EMERGENCY CALL TRIGGERED');
  const [callState, setCallState] = useState('incoming');
  const [demoSequenceTimer, setDemoSequenceTimer] = useState(null);
  const [liveEvent, setLiveEvent] = useState({
    title: 'FALL DETECTED',
    patient: 'Mr. Raghunath Pillai',
    time: 'Today • 10:30 AM',
    status: 'Incoming call from CloseBY Neckband'
  });
  
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
      title: 'FALL DETECTED',
      description: 'CloseBY automatically initiated an emergency call after a possible fall near the living area.',
      voicePlayed: 'Dad, stay still! Help is on the way.',
      timestamp: 'Today, 10:30 AM',
      location: 'Available',
      callStatus: 'Incoming Call',
      read: false
    },
    {
      id: 202,
      type: 'removal',
      title: 'BAND REMOVED',
      description: 'Clasp + body-proximity sensing detected a possible band removal.',
      voicePlayed: 'Dad, please keep this neckband on. It keeps you connected with us.',
      timestamp: 'Yesterday, 04:15 PM',
      location: 'Garden Area',
      callStatus: 'Alert Sent',
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
    if (demoSequenceTimer) {
      clearTimeout(demoSequenceTimer);
    }

    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance("Dad, stay still! Help is on the way.");
    speech.rate = 0.95;
    window.speechSynthesis.speak(speech);

    const newAlert = {
      id: Date.now(),
      type: 'fall',
      title: 'FALL DETECTED',
      description: 'CloseBY detected a possible fall. The familiar family voice played locally and an emergency call was initiated automatically.',
      voicePlayed: 'Dad, stay still! Help is on the way.',
      timestamp: 'Just now',
      location: 'Available',
      callStatus: 'Incoming Call',
      read: false
    };

    setAlerts((prev) => [newAlert, ...prev]);
    setLiveEvent({
      title: 'FALL DETECTED',
      patient: 'Mr. Raghunath Pillai',
      time: 'Today • 10:30 AM',
      status: 'Incoming call — CloseBY Neckband'
    });

    setIncomingCallModal(true);
    setCallState('sequence');
    setCallReason('FALL DETECTED');

    const nextTimer = setTimeout(() => {
      setCallReason('FAMILIAR VOICE PLAYED');
    }, 1200);

    const nextTimer2 = setTimeout(() => {
      setCallReason('AUTOMATIC FALL EMERGENCY CALL TRIGGERED');
      setCallState('incoming');
    }, 2400);

    setDemoSequenceTimer(nextTimer2);
    setTimeout(() => {
      clearTimeout(nextTimer);
      clearTimeout(nextTimer2);
    }, 2600);
  };

  // Simulator Handler: Band Removal
  const handleSimulateRemoval = () => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance("Dad, please keep this neckband on. It keeps you connected with us.");
    speech.rate = 0.95;
    window.speechSynthesis.speak(speech);

    const newAlert = {
      id: Date.now(),
      type: 'removal',
      title: 'BAND REMOVED',
      description: 'Clasp + body-proximity sensing indicates a possible neckband removal event.',
      voicePlayed: 'Dad, please keep this neckband on. It keeps you connected with us.',
      timestamp: 'Just now',
      location: 'TKMCE Campus, Kollam',
      callStatus: 'Alert Sent',
      read: false
    };

    setAlerts((prev) => [newAlert, ...prev]);
    setLiveEvent({
      title: 'BAND REMOVED',
      patient: 'Mr. Raghunath Pillai',
      time: 'Today • 10:35 AM',
      status: 'Removal alert sent to caregiver'
    });
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
        
        {/* Live CloseBY Event Card */}
        <div className="bg-gradient-to-r from-red-50 to-white dark:from-red-950/30 dark:to-slate-900/60 border border-red-200 dark:border-red-500/30 rounded-2xl p-4 shadow-lg shadow-red-900/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-600 dark:text-red-400">🔴 Live CloseBY Event</p>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{liveEvent.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">{liveEvent.patient} • {liveEvent.time}</p>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Fall detected</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Familiar voice played</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Emergency call initiated</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Location available</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">📞 {liveEvent.status}</p>
            <button
              onClick={() => setIncomingCallModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg shadow-emerald-950/30"
            >
              Answer
            </button>
          </div>
        </div>

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

            {callState === 'incoming' || callState === 'sequence' ? (
              <>
                <div className="w-16 h-16 rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center animate-ping">
                  <PhoneCall className="w-8 h-8 text-red-500" />
                </div>

                <div>
                  <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest bg-red-100 dark:bg-red-500/20 px-2 py-0.5 rounded border border-red-300 dark:border-red-500/30">
                    {callReason}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-2">CloseBY Neckband</h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">{callState === 'sequence' ? 'Simulated emergency sequence in progress...' : 'Connecting 2-Way Cellular Audio Line...'}</p>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-2">📍 GPS Location: TKMCE Campus, Kollam</p>
                </div>

                {callState === 'sequence' ? (
                  <div className="w-full text-center text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700">
                    FALL DETECTED → FAMILIAR VOICE PLAYED → AUTOMATIC CALL TRIGGERED
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-4 w-full pt-2">
                    <button
                      onClick={() => setIncomingCallModal(false)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-red-950/50"
                    >
                      Decline
                    </button>

                    <button
                      onClick={() => {
                        setCallState('connected');
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Answer</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-600/20 border-2 border-emerald-500 flex items-center justify-center">
                  <PhoneCall className="w-8 h-8 text-emerald-500" />
                </div>

                <div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30">
                    CALL CONNECTED
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-2">CloseBY Neckband</h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-2">Two-way voice communication active</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Patient: Mr. Raghunath Pillai</p>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-2">📍 GPS Location: Available</p>
                  <p className="text-[11px] text-blue-500 font-semibold mt-1">Connection: 4G LTE</p>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-100 dark:bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-500/30">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  Connected
                </div>

                <div className="flex items-center justify-center gap-4 w-full pt-2">
                  <button
                    onClick={() => setCallState('incoming')}
                    className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs py-3 rounded-xl transition-all"
                  >
                    Mute
                  </button>

                  <button
                    onClick={() => setIncomingCallModal(false)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-red-950/50"
                  >
                    End Call
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
