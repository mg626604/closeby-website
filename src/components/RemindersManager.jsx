import React, { useState } from 'react';
import { Clock, Plus, Trash2, CheckCircle, Pill, Droplet, Sun, Bell, Volume2, Calendar } from 'lucide-react';

export default function RemindersManager({ reminders, setReminders, voiceClips }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('09:00');
  const [category, setCategory] = useState('Medication');
  const [selectedVoiceId, setSelectedVoiceId] = useState(voiceClips[0]?.id || 1);
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);

  const categoryIcons = {
    Medication: <Pill className="w-4 h-4 text-rose-400" />,
    Hydration: <Droplet className="w-4 h-4 text-cyan-400" />,
    Routine: <Sun className="w-4 h-4 text-amber-400" />,
    Checkup: <Bell className="w-4 h-4 text-purple-400" />
  };

  const handleToggle = (id) => {
    setReminders(
      reminders.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleDelete = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const chosenVoice = voiceClips.find((v) => v.id === Number(selectedVoiceId)) || voiceClips[0];

    const newReminder = {
      id: Date.now(),
      title,
      time,
      category,
      voiceTitle: chosenVoice.title,
      voiceSpeaker: chosenVoice.speaker,
      days: selectedDays.join(', '),
      active: true
    };

    setReminders([...reminders, newReminder]);
    setTitle('');
    setShowAddModal(false);
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-5 shadow-xl flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Daily Timers & Familial Voice Reminders</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Schedule medication, hydration, and activity prompts played in comforting family voice directly through the neckband speakers.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-lg shadow-amber-900/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Reminder</span>
        </button>
      </div>

      {/* Reminders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reminders.map((rem) => (
          <div
            key={rem.id}
            className={`bg-white/80 dark:bg-slate-900/60 border rounded-xl p-4 flex flex-col justify-between gap-3 transition-all ${
              rem.active ? 'border-slate-300/80 dark:border-slate-700/80 hover:border-amber-500/50' : 'border-slate-200 dark:border-slate-800 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                  {categoryIcons[rem.category] || <Clock className="w-4 h-4 text-blue-400" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {rem.title}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">
                    ⏰ {rem.time} <span className="text-slate-600 dark:text-slate-400 font-normal">({rem.days})</span>
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggle(rem.id)}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-all ${
                    rem.active ? 'bg-amber-500 justify-end' : 'bg-slate-200 dark:bg-slate-700 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
                </button>

                <button
                  onClick={() => handleDelete(rem.id)}
                  className="text-slate-500 dark:text-slate-500 hover:text-red-400 p-1 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Voice Prompt Info */}
            <div className="bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Assigned Voice: <strong className="text-slate-800 dark:text-slate-200">{rem.voiceTitle}</strong> ({rem.voiceSpeaker})</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding Reminder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Create Scheduled Voice Reminder</h3>
            
            <form onSubmit={handleAddReminder} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Reminder Title</label>
                <input
                  type="text"
                  placeholder="e.g., Morning Diabetes Medication"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Medication">Medication</option>
                    <option value="Hydration">Hydration</option>
                    <option value="Routine">Routine</option>
                    <option value="Checkup">Doctor Checkup</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Assign Familial Voice Clip</label>
                <select
                  value={selectedVoiceId}
                  onChange={(e) => setSelectedVoiceId(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                >
                  {voiceClips.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.title} ({v.speaker})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Repeat Days</label>
                <div className="flex gap-1">
                  {daysOfWeek.map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`flex-1 text-[11px] font-bold py-1.5 rounded transition-all ${
                        selectedDays.includes(day)
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
