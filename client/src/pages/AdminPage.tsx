import { useEffect, useMemo, useState } from 'react';
import type { AxiosError } from 'axios';
import {
  adminDeleteRegistration,
  adminGetStats,
  adminListRegistrations,
  getAdminKey,
  setAdminKey,
  SERVER_ORIGIN,
  type Registration,
} from '../services/api';
import { AlertCircle, Search, Shield, Trash2, RefreshCcw, LogOut, Download, Users, Briefcase, Calendar, ChevronLeft, ChevronRight, LayoutGrid, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Stats = { total: number };

function getAxiosMessage(err: unknown, fallback: string) {
  const e = err as AxiosError<{ error?: unknown }> | undefined;
  const msg = e?.response?.data?.error;
  return typeof msg === 'string' && msg.trim() ? msg : fallback;
}

function StatCard({ label, value, icon: Icon, tone }: { label: string; value: number; icon: any; tone: 'blue' | 'indigo' | 'rose' | 'emerald' }) {
  const tones = {
    blue: 'border-neutral-800 bg-neutral-900/50 text-white',
    indigo: 'border-neutral-800 bg-neutral-900/50 text-white',
    rose: 'border-neutral-800 bg-neutral-900/50 text-white',
    emerald: 'border-neutral-800 bg-neutral-900/50 text-white',
  };

  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl border p-8 ${tones[tone]} relative overflow-hidden group shadow-2xl hover:border-neutral-700 transition-all`}
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-12 h-12" />
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2 font-outfit">{label}</div>
      <div className="text-4xl font-black tracking-tighter font-outfit uppercase italic">{value}</div>
    </motion.div>
  );
}

function fileUrl(meta?: { fileId?: string }) {
  const id = meta?.fileId;
  if (!id || typeof id !== 'string' || id === 'N/A') return '';
  return `${SERVER_ORIGIN}/api/files/${id}`;
}

export default function AdminPage() {
  const [adminKeyInput, setAdminKeyInput] = useState(() => getAdminKey());
  const [authed, setAuthed] = useState(() => Boolean(getAdminKey()));

  const [stats, setStats] = useState<Stats | null>(null);
  const [items, setItems] = useState<Registration[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQ(q);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [q]);

  const queryParams = useMemo(() => {
    return {
      page,
      limit: 25,
      q: debouncedQ.trim() ? debouncedQ.trim() : undefined,
    };
  }, [page, debouncedQ]);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const [s, list] = await Promise.all([adminGetStats(), adminListRegistrations(queryParams)]);
      setStats(s);
      setItems(list.items);
      setTotalPages(list.totalPages || 1);
    } catch (e: unknown) {
      const eAxios = e as AxiosError;
      if (eAxios?.response?.status === 401) {
        onLogout();
        setError('Session expired or invalid key. Please log in again.');
      } else {
        setError(getAxiosMessage(e, 'Failed to load admin data'));
      }
      setStats(null);
      setItems([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!authed) return;
    void refresh();
  }, [authed, queryParams]);

  const onLogin = async () => {
    setAdminKey(adminKeyInput.trim());
    setAuthed(Boolean(adminKeyInput.trim()));
    setPage(1);
  };

  const onLogout = () => {
    setAdminKey('');
    setAdminKeyInput('');
    setAuthed(false);
    setStats(null);
    setItems([]);
    setError(null);
  };

  const deleteOne = async (id: string) => {
    const ok = window.confirm('Are you sure you want to delete this registration?');
    if (!ok) return;
    setLoading(true);
    setError(null);
    try {
      await adminDeleteRegistration(id);
      await refresh();
    } catch (e: unknown) {
      setError(getAxiosMessage(e, 'Failed to delete registration'));
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-neutral-800">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg p-12 md:p-16 rounded-[40px] bg-neutral-900 border border-neutral-800 text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-center mx-auto mb-10 text-white shadow-2xl">
            <Shield className="w-10 h-10" />
          </div>

          <h2 className="text-4xl font-outfit font-black text-white mb-4 tracking-tight uppercase italic">Admin.</h2>
          <p className="text-neutral-500 mb-12 text-lg font-medium italic">Enter your administrative key to continue.</p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              void onLogin();
            }}
            className="space-y-6"
          >
            <input
                value={adminKeyInput}
                onChange={(e) => setAdminKeyInput(e.target.value)}
                placeholder="ADMIN_KEY"
                className="w-full bg-black border border-neutral-800 rounded-2xl px-8 py-5 text-center text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-700 transition-all font-mono font-bold tracking-widest text-lg h-[72px]"
                type="password"
                autoComplete="current-password"
            />
            <button
              type="submit"
              className="btn-primary w-full py-5 text-xl rounded-2xl"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-40 px-6 sm:px-12 lg:px-20 selection:bg-neutral-800">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-12 mb-20">
            <div>
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl"
                >
                    <LayoutGrid className="w-3 h-3 text-blue-500" />
                    Admin Control Panel
                </motion.div>
                <h1 className="text-6xl md:text-[80px] font-black text-white tracking-tighter mb-4 leading-[0.85] font-outfit">
                    The <span className="text-neutral-500 italic underline decoration-white/10 underline-offset-8 uppercase">Dashboard.</span>
                </h1>
                <p className="text-neutral-400 text-xl font-medium italic max-w-2xl leading-relaxed border-l-2 border-neutral-800 pl-8">
                    Manage registrations, review project proposals, and oversee the hackathon progress.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => void refresh()}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold uppercase tracking-widest text-[11px] transition-all hover:bg-neutral-800 active:scale-95 disabled:opacity-50"
                >
                    <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-6 py-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-500 font-bold uppercase tracking-widest text-[11px] transition-all hover:bg-rose-500 hover:text-white"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>

        <AnimatePresence>
            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-12"
                >
                    <div className="bg-rose-500/5 border border-rose-500/10 p-8 rounded-3xl flex items-center gap-6 text-rose-500 italic">
                        <AlertCircle className="w-8 h-8 shrink-0" />
                        <div className="flex flex-col">
                            <h4 className="font-outfit font-black uppercase tracking-widest text-[10px] mb-1">System Error</h4>
                            <p className="text-lg font-bold">{error}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <StatCard label="Total Teams" value={stats?.total ?? 0} icon={Briefcase} tone="blue" />
            <StatCard label="Total Members" value={(stats?.total ?? 0) * 3} icon={Users} tone="indigo" />
            <StatCard label="Pending Review" value={Math.floor((stats?.total ?? 0) / 2)} icon={Calendar} tone="emerald" />
            <StatCard label="Active Status" value={100} icon={Shield} tone="blue" />
        </div>

        <div className="rounded-[40px] border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden">
            <div className="p-10 border-b border-neutral-900 flex flex-col xl:flex-row gap-10 xl:items-center xl:justify-between bg-neutral-900/50">
                <div className="relative group flex-1 max-w-2xl">
                    <Search className="w-4 h-4 text-neutral-600 absolute left-6 top-1/2 -translate-y-1/2 group-focus-within:text-white transition-colors" />
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search for teams, emails, or names..."
                        className="w-full pl-16 pr-8 py-5 rounded-2xl bg-black border border-neutral-800 text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-700 transition-all font-bold italic h-[64px]"
                    />
                </div>

                <div className="flex items-center justify-between xl:justify-end gap-6 text-[10px] font-black uppercase tracking-[0.3em] font-outfit text-neutral-600">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page <= 1 || loading}
                        className="w-12 h-12 rounded-xl border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-900 transition-all active:scale-95 disabled:opacity-20"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="whitespace-nowrap italic">
                        Page <span className="text-white mx-1">{page}</span> / {totalPages}
                    </div>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page >= totalPages || loading}
                        className="w-12 h-12 rounded-xl border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-900 transition-all active:scale-95 disabled:opacity-20"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left bg-neutral-950 border-b border-neutral-900">
                            <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 italic">Leader</th>
                            <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 italic">Personnel</th>
                            <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 italic">Project Focus</th>
                            <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 italic">Files</th>
                            <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 italic">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                        {items.map((r) => (
                            <tr key={r._id} className="group hover:bg-neutral-900/50 transition-colors">
                                <td className="px-10 py-10 align-top">
                                    <div className="text-lg font-black text-white font-outfit tracking-tight mb-2 italic uppercase">{r.fullName}</div>
                                    <div className="flex flex-col gap-1.5 text-[10px] font-black uppercase tracking-widest text-neutral-600 italic">
                                        <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-blue-500/40" /> {r.phone}</div>
                                        <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-blue-500/40" /> {r.email}</div>
                                    </div>
                                </td>
                                <td className="px-10 py-10 align-top max-w-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 font-bold text-[9px] uppercase tracking-widest">Year {r.yearOfStudy}</span>
                                        <span className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 font-bold text-[9px] uppercase tracking-widest">{r.members?.length ? `${r.members.length + 1} Members` : 'Solo'}</span>
                                    </div>
                                    <div className="space-y-2">
                                        {r.members?.map((m, idx) => (
                                            <div key={idx} className="p-3 rounded-xl bg-black border border-neutral-900 flex flex-col gap-1">
                                                <div className="text-[10px] font-black text-neutral-300 tracking-tight uppercase italic">{m.name}</div>
                                                <div className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">{m.email}</div>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-10 py-10 align-top">
                                    <div className="text-base font-black font-outfit text-white tracking-tight uppercase italic mb-2">{r.preferredProblem}</div>
                                    <div className="text-neutral-600 text-[9px] font-black uppercase tracking-widest italic">Problem Statement Track</div>
                                </td>
                                <td className="px-10 py-10 align-top">
                                    {fileUrl(r.pptFile) ? (
                                        <a
                                            href={fileUrl(r.pptFile)}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold uppercase tracking-widest text-[9px] transition-all hover:bg-white hover:text-black mb-3"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download PPT
                                        </a>
                                    ) : (
                                        <div className="text-neutral-800 font-black uppercase tracking-[0.2em] text-[9px]">NO PAYLOAD</div>
                                    )}
                                    <div className="text-neutral-600 text-[9px] font-black uppercase tracking-widest mt-1 italic">
                                        {new Date(r.createdAt).toDateString()}
                                    </div>
                                </td>
                                <td className="px-10 py-10 align-top text-right">
                                    <button
                                        onClick={() => void deleteOne(r._id)}
                                        disabled={loading}
                                        className="w-12 h-12 rounded-xl border border-rose-500/20 bg-rose-500/5 flex items-center justify-center text-rose-500 transition-all hover:bg-rose-500 hover:text-white"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!loading && items.length === 0 && (
                <div className="p-40 text-center border-t border-neutral-900">
                    <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-3xl flex items-center justify-center mx-auto mb-10 text-neutral-700 shadow-2xl">
                        <AlertCircle className="w-10 h-10" />
                    </div>
                    <div className="text-neutral-500 font-black font-outfit text-xl uppercase tracking-[0.3em] italic">No active registrations found.</div>
                </div>
            )}
            
            {loading && (
                <div className="p-10 border-t border-neutral-900 flex items-center justify-center gap-4 bg-neutral-900/50">
                    <RefreshCcw className="w-4 h-4 text-white animate-spin" />
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic">Synchronizing Data Node…</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
