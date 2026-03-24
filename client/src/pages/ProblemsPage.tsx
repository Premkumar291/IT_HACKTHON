import { useState, useMemo, useEffect } from 'react';
import ProblemCard from '../components/ProblemCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Database, Blocks, Loader2, X } from 'lucide-react';
import type { Problem } from '../data/problems';

const ProblemsPage = () => {
    const [allProblems, setAllProblems] = useState<Problem[]>([]);
    const [allDomains, setAllDomains] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('All Domains');
    const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

    // Lazy load the huge problems data to make the page component chunk smaller and load instantly
    useEffect(() => {
        const loadData = async () => {
            const data = await import('../data/problems');
            setAllProblems(data.problems);
            setAllDomains(data.domains);
            setIsLoading(false);
        };
        loadData();
    }, []);

    const filteredProblems = useMemo(() => {
        return allProblems.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 p.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDomain = selectedDomain === 'All Domains' || p.domain === selectedDomain;
            return matchesSearch && matchesDomain;
        });
    }, [allProblems, searchQuery, selectedDomain]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProblem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedProblem]);

    return (
        <div className="min-h-screen bg-black pt-32 pb-40 px-6 max-w-7xl mx-auto selection:bg-neutral-800">
            <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
                <div className="max-w-2xl text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-400 mb-6 w-fit uppercase tracking-widest"
                    >
                        <Blocks className="w-3 h-3 text-blue-500" />
                        Hackathon Tracks 2026
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight font-outfit"
                    >
                        Select your <span className="text-neutral-500 italic">challenge.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl"
                    >
                        Click on any track to view full details. Browse through our curated database of {allProblems.length} problem statements.
                    </motion.p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2 relative group">
                    <Search className="w-4 h-4 text-neutral-600 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-white transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search for problem statements..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-12 pr-6 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 transition-all font-medium h-[58px]"
                    />
                </div>
                
                <select 
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-neutral-700 transition-all font-medium appearance-none h-[58px]"
                >
                    <option value="All Domains">All Domains</option>
                    {allDomains.map(d => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-40">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                    <p className="text-neutral-500 font-medium italic uppercase tracking-widest text-[10px]">Synchronizing Problem Database...</p>
                </div>
            ) : (
                <>
                    {/* Problem Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProblems.map((p) => (
                            <motion.div
                                layout
                                key={p.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <ProblemCard problem={p} onClick={() => setSelectedProblem(p)} />
                            </motion.div>
                        ))}
                    </div>

                    {filteredProblems.length === 0 && (
                        <div className="text-center py-40 border border-dashed border-neutral-800 rounded-3xl bg-neutral-950/50">
                            <Database className="w-12 h-12 text-neutral-800 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight font-outfit">No results found</h3>
                            <p className="text-neutral-600 font-medium">Try adjusting your filters or search keywords.</p>
                        </div>
                    )}
                </>
            )}

            {/* Premium Modal for Problem Detail */}
            <AnimatePresence>
                {selectedProblem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProblem(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                        >
                            <div className="p-8 md:p-12 overflow-y-auto">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-black border border-neutral-800 text-xs font-black text-blue-500 uppercase tracking-[0.2em] italic">
                                        ID: {selectedProblem.id}
                                    </div>
                                    <button 
                                        onClick={() => setSelectedProblem(null)}
                                        className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white hover:bg-neutral-700 transition-all hover:rotate-90"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <motion.h2 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight font-outfit italic uppercase"
                                >
                                    {selectedProblem.title}
                                </motion.h2>

                                <div className="space-y-8">
                                    <div className="p-8 rounded-2xl bg-black/50 border border-neutral-800">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-6 border-b border-neutral-800 pb-2 italic">Problem Statement</h4>
                                        <p className="text-neutral-300 text-lg md:text-xl font-medium leading-relaxed whitespace-pre-wrap">
                                            {selectedProblem.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="flex-1 p-6 rounded-2xl bg-neutral-800/30 border border-neutral-800">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-4 italic">Domain Track</h4>
                                            <div className="text-white font-bold text-lg italic uppercase">{selectedProblem.domain}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-neutral-800/50 border-t border-neutral-800 flex items-center justify-between">
                                <div className="text-neutral-500 font-bold text-[10px] uppercase tracking-widest italic">
                                    Hackathon 2026 • Official Track
                                </div>
                                <button 
                                    onClick={() => setSelectedProblem(null)}
                                    className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-105 transition-all active:scale-95"
                                >
                                    Close Details
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProblemsPage;
