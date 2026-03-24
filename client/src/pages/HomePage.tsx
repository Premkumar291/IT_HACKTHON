import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Code, Cpu } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-black overflow-hidden selection:bg-neutral-800">
            {/* Background Grain */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Subtle Gradient Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-white/10 blur-[100px] pointer-events-none" />

            <section className="relative pt-32 pb-40 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-400 mb-8"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                        <span>HACK THE LIMITZ 2026 Registration Open</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9] font-outfit"
                    >
                        Create the future <br /> 
                        <span className="text-neutral-500 italic">one line at a time.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
                    >
                        Join hundreds of developers in the most prestigious hackathon of the year. Build, innovate, and connect with industry leaders.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <Link to="/register" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
                            Start Building Now
                        </Link>
                        <Link to="/problems" className="btn-secondary w-full sm:w-auto text-lg px-8 py-4">
                            View Problem Statements
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-40 px-6 max-w-7xl mx-auto border-t border-neutral-900">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card 
                        icon={<Code className="text-blue-500" />} 
                        title="Software Innovation" 
                        desc="Build web and mobile solutions that solve real-world problems with elegant code." 
                    />
                    <Card 
                        icon={<Cpu className="text-indigo-500" />} 
                        title="Hardware & IoT" 
                        desc="Integrate hardware and software to create physical systems that bridge reality." 
                    />
                    <Card 
                        icon={<Brain className="text-amber-500" />} 
                        title="AI & Machine Learning" 
                        desc="Leverage intelligent models to push the boundaries of what's possible." 
                    />
                </div>
            </section>
        </div>
    );
};

const Card = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="p-10 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all duration-200 group">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-105 transition-transform">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight font-outfit">{title}</h3>
        <p className="text-neutral-500 leading-relaxed font-medium">{desc}</p>
    </div>
);

const Brain = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"/>
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"/>
    </svg>
);

export default HomePage;
