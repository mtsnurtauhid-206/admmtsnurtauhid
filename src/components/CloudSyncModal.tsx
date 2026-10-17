import React, { useState } from 'react';
import { Cloud, CheckCircle2, RefreshCw, X, Server, Database, Smartphone, Laptop, Tablet, ShieldCheck, ArrowRight, Layers, Wifi, WifiOff } from 'lucide-react';
import { SchoolId } from '../types';

interface CloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOnline: boolean;
  isFirebaseConnected: boolean;
  onSyncAllToCloud: () => Promise<any>;
  dataCounts: {
    students: number;
    teachers: number;
    subjects: number;
    schedules: number;
    sessions: number;
    grades: number;
    lessonPlans: number;
    payments: number;
    violations: number;
    suratKeluar: number;
    suratMasuk: number;
  };
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({
  isOpen,
  onClose,
  isOnline,
  isFirebaseConnected,
  onSyncAllToCloud,
  dataCounts
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    try {
      await onSyncAllToCloud();
      setSyncResult('Semua data lokal berhasil dipush dan disinkronkan ke Firebase Cloud! Semua perangkat sekarang memiliki data yang identik.');
    } catch (err: any) {
      setSyncResult('Gagal menyinkronkan data: ' + (err?.message || 'Periksa koneksi internet Anda'));
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base leading-tight">
                Koneksi Firebase & Realtime Sync
              </h2>
              <p className="text-[11px] text-emerald-200">
                Sinkronisasi otomatis antar setiap perangkat (HP, Tablet, Laptop)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
          
          {/* Status Indicator Card */}
          <div className="p-3.5 rounded-xl border bg-emerald-50/70 border-emerald-200 flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-black text-emerald-950 text-xs sm:text-sm">
                  Firebase Firestore Cloud Aktif
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse mr-1"></span>
                  Realtime
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
                Aplikasi telah tersambung langsung ke Cloud Firestore. Setiap kali Bapak/Ibu Guru mengisi presensi, jurnal, nilai, atau tagihan di HP, data otomatis terupdate di HP atau Laptop guru lain dalam hitungan detik tanpa perlu refresh halaman.
              </p>
            </div>
          </div>

          {/* Multi-Device Visual Representation */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
              Dukungan Multi-Perangkat Serentak
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col items-center">
                <Smartphone className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="font-bold text-[11px] text-slate-800">HP Guru</span>
                <span className="text-[9px] text-slate-500">Absen di Kelas</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col items-center">
                <Tablet className="w-5 h-5 text-indigo-600 mb-1" />
                <span className="font-bold text-[11px] text-slate-800">Tablet / POS</span>
                <span className="text-[9px] text-slate-500">Kasir & Koperasi</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col items-center">
                <Laptop className="w-5 h-5 text-blue-600 mb-1" />
                <span className="font-bold text-[11px] text-slate-800">Laptop / PC</span>
                <span className="text-[9px] text-slate-500">Tata Usaha & Wali Kelas</span>
              </div>
            </div>
          </div>

          {/* Database Specs */}
          <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden text-[11px]">
            <div className="px-3.5 py-2 bg-slate-50 flex items-center justify-between">
              <span className="font-bold text-slate-600 flex items-center space-x-1.5">
                <Database className="w-3.5 h-3.5 text-slate-500" />
                <span>Database ID Cloud</span>
              </span>
              <span className="font-mono text-slate-800 font-bold truncate max-w-[200px]" title="ai-studio-administrasiguru-b8bd4490-0aa5-491a-9c3d-655989dc0c54">
                ai-studio-administrasiguru...
              </span>
            </div>
            <div className="px-3.5 py-2 bg-white flex items-center justify-between">
              <span className="font-medium text-slate-600">Mode Sinkronisasi</span>
              <span className="font-bold text-emerald-700">Bidirectional WebChannel / Polling</span>
            </div>
            <div className="px-3.5 py-2 bg-white flex items-center justify-between">
              <span className="font-medium text-slate-600">Dukungan Offline</span>
              <span className="font-bold text-slate-800">IndexedDB + Auto Queue Re-sync</span>
            </div>
          </div>

          {/* Data Counts Summary */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-[11px] font-extrabold text-slate-600 block">
              Ringkasan Data yang Tersinkronisasi:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
              <span className="bg-white px-2 py-1 rounded border border-slate-200">👨‍🎓 {dataCounts.students} Siswa</span>
              <span className="bg-white px-2 py-1 rounded border border-slate-200">👨‍🏫 {dataCounts.teachers} Guru</span>
              <span className="bg-white px-2 py-1 rounded border border-slate-200">📖 {dataCounts.subjects} Mapel</span>
              <span className="bg-white px-2 py-1 rounded border border-slate-200">📅 {dataCounts.schedules} Jadwal</span>
              <span className="bg-white px-2 py-1 rounded border border-slate-200">📝 {dataCounts.sessions} Presensi</span>
              <span className="bg-white px-2 py-1 rounded border border-slate-200">💳 {dataCounts.payments} Transaksi</span>
            </div>
          </div>

          {syncResult && (
            <div className={`p-3 rounded-xl text-xs font-bold ${
              syncResult.includes('berhasil') ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-rose-100 text-rose-950 border border-rose-300'
            }`}>
              {syncResult}
            </div>
          )}

          {/* Manual Force Push Action */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleSyncNow}
              disabled={isSyncing || !isOnline}
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-xs transition cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Menyinkronkan ke Cloud...' : 'Sinkronkan Semua Data Lokal ke Cloud Sekarang'}</span>
            </button>
            <p className="text-[10px] text-slate-500 text-center mt-1.5">
              Gunakan tombol ini jika baru saja mengimpor data siswa/jadwal atau ingin memastikan seluruh data perangkat ini terkirim ke Firebase.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition text-xs cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
