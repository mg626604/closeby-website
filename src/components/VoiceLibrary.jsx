import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Pause, Upload, Trash2, CheckCircle2, Volume2, User, Plus, Radio } from 'lucide-react';

export default function VoiceLibrary({ voiceClips, setVoiceClips }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [playingId, setPlayingId] = useState(null);
  const [syncMessage, setSyncMessage] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Fall De-escalation');
  const [newSpeaker, setNewSpeaker] = useState('Son (Arjun)');
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);

  // Speech Synthesis fallback so voice clips play audible voice prompts in browser!
  const playSpeech = (text, clipId) => {
    if (playingId === clipId) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setPlayingId(clipId);
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    window.speechSynthesis.speak(utterance);
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    clearInterval(timerRef.current);

    if (newTitle.trim()) {
      const newClip = {
        id: Date.now(),
        title: newTitle,
        category: newCategory,
        speaker: newSpeaker,
        duration: `${recordingTime}s`,
        text: `Hey Dad, it's ${newSpeaker.split(' ')[0]}. ${newTitle} - Everything is alright, keep calm.`,
        isDefault: false,
        syncStatus: 'Sync Pending'
      };
      setVoiceClips((prev) => [newClip, ...prev]);
      setSyncMessage('VOICE SAVED');
      setTimeout(() => {
        setSyncMessage('SYNCING TO CLOSEBY...');
        setTimeout(() => {
          setVoiceClips((prev) => prev.map((clip) => clip.id === newClip.id ? { ...clip, syncStatus: '✓ Synced to Neckband' } : clip));
          setSyncMessage('✓ SYNCED TO NECKBAND');
        }, 900);
      }, 600);
      setNewTitle('');
    }
  };

  const handleDelete = (id) => {
    setVoiceClips(voiceClips.filter((c) => c.id !== id));
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const clipName = file.name.replace(/\.[^/.]+$/, '') || 'Uploaded Voice Prompt';
    const uploadClip = {
      id: Date.now(),
      title: clipName,
      category: newCategory,
      speaker: newSpeaker,
      duration: 'Uploaded',
      text: `Uploaded voice prompt for ${newCategory.toLowerCase()}.`,
      isDefault: false,
      syncStatus: 'Sync Pending'
    };

    setVoiceClips((prev) => [uploadClip, ...prev]);
    setSyncMessage('VOICE SAVED');
    setTimeout(() => {
      setSyncMessage('SYNCING TO CLOSEBY...');
      setTimeout(() => {
        setVoiceClips((prev) => prev.map((clip) => clip.id === uploadClip.id ? { ...clip, syncStatus: '✓ Synced to Neckband' } : clip));
        setSyncMessage('✓ SYNCED TO NECKBAND');
      }, 900);
    }, 600);

    event.target.value = '';
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-5 shadow-xl flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Familial Voice Library & Audio Anchors</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Record and manage trusted relative voice clips played locally on CloseBY neckband during emergencies and reminders.
          </p>
        </div>

        <span className="bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full border border-purple-300 dark:border-purple-500/30">
          Local Emergency Voice Playback
        </span>
      </div>

      {syncMessage && (
        <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 text-xs font-bold rounded-lg px-3 py-2 tracking-wide">
          {syncMessage}
        </div>
      )}

      {/* Voice Recorder Module */}
      <div className="bg-white/90 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-700/80 rounded-xl p-4">
        <div className="flex flex-col gap-4">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-400" />
            <span>Record New Familial Voice Prompt</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Clip Name (e.g., Dad Fall Reassurance)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500"
            />
            
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500"
            >
              <option value="Fall De-escalation">Fall De-escalation</option>
              <option value="Band Removal Persuasion">Band Removal Persuasion</option>
              <option value="Medication Prompt">Medication Prompt</option>
              <option value="Hydration Reminder">Hydration Reminder</option>
              <option value="Other personalized reminders">Other personalized reminders</option>
            </select>

            <select
              value={newSpeaker}
              onChange={(e) => setNewSpeaker(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500"
            >
              <option value="Son (Arjun)">Son (Arjun)</option>
              <option value="Daughter (Kavitha)">Daughter (Kavitha)</option>
              <option value="Spouse (Sumithra)">Spouse (Sumithra)</option>
              <option value="Grandchild (Advaith)">Grandchild (Advaith)</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:justify-end">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-xs px-4 py-2.5 rounded-lg transition-all"
            >
              <Upload className="w-4 h-4 text-blue-400" />
              <span>Upload Audio</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleAudioUpload}
            />

            {isRecording ? (
              <button
                onClick={stopRecording}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-lg shadow-red-900/40 animate-pulse"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Stop Recording ({recordingTime}s)</span>
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-lg shadow-red-900/20"
              >
                <Mic className="w-4 h-4" />
                <span>Start Recording</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Voice Clips List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {voiceClips.map((clip) => {
          const isPlaying = playingId === clip.id;
          return (
            <div
              key={clip.id}
              className={`bg-white/80 dark:bg-slate-900/60 border rounded-xl p-4 flex flex-col justify-between gap-3 transition-all ${
                isPlaying ? 'border-emerald-500/80 bg-white dark:bg-slate-900/90 shadow-lg shadow-emerald-950/40' : 'border-slate-300/60 dark:border-slate-700/60 hover:border-slate-400 dark:hover:border-slate-600'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {clip.title}
                      {clip.isDefault && (
                        <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30">
                          Active Anchor
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                      <User className="w-3 h-3 text-purple-400" />
                      <span>{clip.speaker}</span>
                      <span>•</span>
                      <span className="text-blue-400 font-medium">{clip.category}</span>
                    </p>
                  </div>

                  {!clip.isDefault && (
                    <button
                      onClick={() => handleDelete(clip.id)}
                      className="text-slate-500 dark:text-slate-500 hover:text-red-400 p-1 transition-colors"
                      title="Delete Clip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <p className="text-xs italic text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 mt-3">
                  "{clip.text}"
                </p>

                <div className="mt-2 text-[10px] font-semibold text-purple-700 dark:text-purple-300">
                  {clip.syncStatus || '✓ Synced to Neckband'}
                </div>
              </div>

              {/* Controls Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-500 font-mono">Length: {clip.duration}</span>

                <button
                  onClick={() => playSpeech(clip.text, clip.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    isPlaying
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Stop Audio</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                      <span>Test Play Audio</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
