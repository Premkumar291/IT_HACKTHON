import { useState, useMemo } from 'react';
import ProblemCard from '../components/ProblemCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Database, Blocks } from 'lucide-react';
import { problems, domains } from '../data/problems';

const ProblemsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('All Domains');

    const filteredProblems = useMemo(() => {
        return problems.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 p.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDomain = selectedDomain === 'All Domains' || p.domain === selectedDomain;
            return matchesSearch && matchesDomain;
        });
    }, [searchQuery, selectedDomain]);

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
                        Browse through curated problem statements across multiple domains. Choose the one that fuels your creative vision.
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
                    {domains.map(d => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </div>

            {/* Problem Grid */}
            <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence>
                    {filteredProblems.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ProblemCard problem={p} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProblems.length === 0 && (
                <div className="text-center py-40 border border-dashed border-neutral-800 rounded-3xl bg-neutral-950/50">
                    <Database className="w-12 h-12 text-neutral-800 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight font-outfit">No results found</h3>
                    <p className="text-neutral-600 font-medium">Try adjusting your filters or search keywords.</p>
                </div>
            )}
        </div>
    );
};

export default ProblemsPage;
