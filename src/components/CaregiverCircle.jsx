import React, { useState } from 'react';
import { Users, UserPlus, Phone, ShieldCheck, Mail, CheckCircle2, Star, Trash2 } from 'lucide-react';

export default function CaregiverCircle({ caregivers, setCaregivers }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Son');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState('Secondary');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newCaregiver = {
      id: Date.now(),
      name,
      relation,
      phone,
      email,
      priority,
      isPrimary: priority === 'Primary'
    };

    setCaregivers([...caregivers, newCaregiver]);
    setName('');
    setPhone('');
    setEmail('');
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    setCaregivers(caregivers.filter((c) => c.id !== id));
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-5 shadow-xl flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Caregiver Circle & Emergency Priority</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Authorized family members receiving automated 4G SMS alerts, voice calls, and cloud telemetry access.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-lg shadow-purple-900/20"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Caregiver</span>
        </button>
      </div>

      {/* Caregivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {caregivers.map((cg) => (
          <div
            key={cg.id}
            className={`bg-white/80 dark:bg-slate-900/60 border rounded-xl p-4 flex flex-col justify-between gap-4 transition-all ${
              cg.isPrimary ? 'border-purple-500/80 bg-white dark:bg-slate-900/90 shadow-lg shadow-purple-950/30' : 'border-slate-300/60 dark:border-slate-700/60'
            }`}
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-400 text-white font-bold flex items-center justify-center text-sm shadow-md">
                    {cg.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {cg.name}
                      {cg.isPrimary && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                    </h3>
                    <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">{cg.relation}</p>
                  </div>
                </div>

                {!cg.isPrimary && (
                  <button
                    onClick={() => handleDelete(cg.id)}
                    className="text-slate-500 dark:text-slate-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="mt-4 flex flex-col gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span>{cg.phone}</span>
                </div>
                {cg.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                    <span>{cg.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                cg.isPrimary ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {cg.isPrimary ? '1st Emergency Responder' : 'Secondary Contact'}
              </span>

              <span className="text-emerald-400 text-[11px] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> SMS Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding Caregiver */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Add Authorized Caregiver</h3>
            
            <form onSubmit={handleAdd} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g., Krishnaja S"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Relationship</label>
                  <input
                    type="text"
                    placeholder="e.g., Daughter"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Phone (4G SMS)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="caregiver@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Emergency Call Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="Secondary">Secondary Contact</option>
                  <option value="Primary">Primary Responder (First Dialed)</option>
                </select>
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
                  className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Add Caregiver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
