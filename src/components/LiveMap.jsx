import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, ShieldCheck, AlertCircle, RefreshCw, Layers } from 'lucide-react';

// Custom Leaflet marker icons
const seniorIcon = L.divIcon({
  className: 'custom-senior-marker',
  html: `<div class="relative">
          <div class="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-red-500/40 animate-ping"></div>
          <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600 to-rose-400 border-2 border-white flex items-center justify-center shadow-lg text-white font-bold text-[10px]">🧓</div>
        </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

export default function LiveMap({ seniorLocation, safeZoneRadius, setSafeZoneRadius, isGeofenceActive, setIsGeofenceActive }) {
  const [mapCenter, setMapCenter] = useState([seniorLocation.lat, seniorLocation.lng]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setMapCenter([seniorLocation.lat, seniorLocation.lng]);
  }, [seniorLocation]);

  const handleRecenter = () => {
    setIsRefreshing(true);
    setMapCenter([seniorLocation.lat, seniorLocation.lng]);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-300/80 dark:border-slate-700/80 p-5 shadow-xl flex flex-col gap-4">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Live Location & Safe-Zone Monitoring</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Monitoring Senior: <span className="text-slate-800 dark:text-slate-200 font-semibold">{seniorLocation.name}</span> • Demo device status: <span className="text-emerald-400 font-medium">SIMULATED</span>
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={handleRecenter}
            className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg transition-all border border-slate-300 dark:border-slate-600"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Recenter GPS</span>
          </button>

          <button
            onClick={() => setIsGeofenceActive(!isGeofenceActive)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all border ${
              isGeofenceActive
                ? 'bg-emerald-100 dark:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border-emerald-400 dark:border-emerald-500/40 hover:bg-emerald-200 dark:hover:bg-emerald-600/30'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Geofence: {isGeofenceActive ? 'Active' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* Geofence Radius Slider */}
      <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-300/50 dark:border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 w-full sm:w-auto">
          <span className="font-semibold text-slate-800 dark:text-slate-200">Safe-Zone Radius:</span>
          <span className="bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-500/30">
            {safeZoneRadius} meters
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-64">
          <span className="text-slate-500 dark:text-slate-500 text-[11px]">100m</span>
          <input
            type="range"
            min="100"
            max="2000"
            step="50"
            value={safeZoneRadius}
            onChange={(e) => setSafeZoneRadius(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
          />
          <span className="text-slate-500 dark:text-slate-500 text-[11px]">2km</span>
        </div>
      </div>

      {/* Leaflet Map Box */}
      <div className="h-[380px] w-full rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 relative shadow-inner">
        <MapContainer center={mapCenter} zoom={16} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Senior Location Marker */}
          <Marker position={[seniorLocation.lat, seniorLocation.lng]} icon={seniorIcon}>
            <Popup>
              <div className="text-slate-900 p-1 text-xs">
                <strong className="block text-sm">{seniorLocation.name}</strong>
                <span className="text-slate-600 block mt-0.5">{seniorLocation.address}</span>
                <span className="text-emerald-600 font-semibold block mt-1">Status: Wearing Neckband</span>
              </div>
            </Popup>
          </Marker>

          {/* Safe Zone Geofence Circle */}
          {isGeofenceActive && (
            <Circle
              center={[seniorLocation.homeLat, seniorLocation.homeLng]}
              radius={safeZoneRadius}
              pathOptions={{
                color: '#10b981',
                fillColor: '#10b981',
                fillOpacity: 0.15,
                weight: 2,
                dashArray: '6, 6'
              }}
            />
          )}
        </MapContainer>

        {/* Floating Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 z-[400] bg-white dark:bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 flex flex-col gap-1 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>Live Senior GPS Pin</span>
          </div>
          {isGeofenceActive && (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border border-emerald-400 bg-emerald-500/20" />
              <span>Safe-Zone Boundary ({safeZoneRadius}m)</span>
            </div>
          )}
        </div>
      </div>

      {/* Address Card */}
      <div className="bg-white/60 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-300/40 dark:border-slate-700/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <Navigation className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <div>
            <span className="text-slate-600 dark:text-slate-400">Current Location: </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{seniorLocation.address}</span>
          </div>
        </div>
        <span className="text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Inside Safe Zone
        </span>
      </div>

    </div>
  );
}
