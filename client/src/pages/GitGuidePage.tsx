import { Download, Terminal, GitBranch, Github as GithubIcon, ShieldCheck, Cpu, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const GitGuidePage = () => {
    return (
        <div className="min-h-screen relative bg-black pt-32 pb-40 px-6 selection:bg-neutral-800">
            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-12">
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl"
                        >
                            <Terminal className="w-3 h-3" />
                            Official Git Protocol
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-[80px] font-black text-white tracking-tighter mb-8 leading-[0.85] font-outfit"
                        >
                            Collaborate with <span className="text-neutral-500 italic">confidence.</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-neutral-400 text-xl font-medium italic max-w-2xl leading-relaxed border-l-2 border-neutral-800 pl-8"
                        >
                            Master the essentials of Git. Follow our version control guidelines to maintain a clean codebase and work effectively with your team.
                        </motion.p>
                    </div>

                    <motion.a
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="/src/assets/git-guide.pdf"
                        download
                        className="btn-primary"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download PDF Manual
                    </motion.a>
                </div>

                <div className="grid grid-cols-1 gap-12 relative">
                    {/* Progress line */}
                    <div className="absolute left-[39px] top-6 bottom-6 w-px bg-neutral-900 hidden md:block" />

                    <GuideSection
                        step="01"
                        title="Installation"
                        icon={<Cpu className="w-6 h-6" />}
                        content="Download and install Git from the official website for your OS. Verify the installation via terminal."
                        code="git --version"
                    />

                    <GuideSection
                        step="02"
                        title="GitHub Sync"
                        icon={<GithubIcon className="w-6 h-6" />}
                        content="Create a GitHub account. GitHub will serve as the remote hosting platform for your team's code."
                    />

                    <GuideSection
                        step="03"
                        title="Initialize Repo"
                        icon={<Terminal className="w-6 h-6" />}
                        content="Turn your local project directory into a Git repository."
                        code='git init'
                    />

                    <GuideSection
                        step="04"
                        title="Staging Changes"
                        icon={<Terminal className="w-6 h-6" />}
                        content="Phase your files into the staging environment."
                        code='git add .'
                    />

                    <GuideSection
                        step="05"
                        title="Commit"
                        icon={<Terminal className="w-6 h-6" />}
                        content="Create a snapshot of your staged files with a descriptive message."
                        code='git commit -m "Initial commit"'
                    />

                    <GuideSection
                        step="06"
                        title="Remote Origin"
                        icon={<GitBranch className="w-6 h-6" />}
                        content="Link your local repository to the remote GitHub repository."
                        code="git remote add origin <repository-url>"
                    />

                    <GuideSection
                        step="07"
                        title="Push"
                        icon={<Terminal className="w-6 h-6" />}
                        content="Upload your committed changes to GitHub."
                        code="git push -u origin main"
                    />

                    <GuideSection
                        step="08"
                        title="Team Access"
                        icon={<ShieldCheck className="w-6 h-6" />}
                        content="Invite your teammates via the 'Settings' tab on GitHub under 'Collaborators'."
                    />

                    <GuideSection
                        step="09"
                        title="Cloning"
                        icon={<Terminal className="w-6 h-6" />}
                        content="To join a project, clone the existing repository to your local machine."
                        code="git clone <repository-url>"
                    />
                </div>
            </div>
        </div>
    );
};

const GuideSection = ({ step, title, content, code, icon }: { step: string, title: string, content?: string, code?: string, icon?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 pl-0 md:pl-28 group"
    >
        {/* Step Marker */}
        <div className="absolute left-0 top-1 hidden md:flex w-20 h-20 items-stretch justify-center">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white font-outfit font-black text-sm shadow-xl transition-all duration-300">
                {step}
            </div>
        </div>

        <div className="p-8 md:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl relative overflow-hidden group-hover:bg-neutral-900 transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all text-white scale-[2] pointer-events-none">
                {icon}
            </div>

            <div className="flex flex-col gap-8">
                <div>
                    <h2 className="text-3xl font-outfit font-black text-white tracking-tight uppercase italic mb-6">
                        {title}
                    </h2>
                    {content && (
                        <p className="text-neutral-500 text-lg font-medium leading-relaxed border-l-2 border-neutral-900 pl-8 italic">
                            {content}
                        </p>
                    )}
                </div>

                {code && (
                    <div className="rounded-2xl bg-black border border-neutral-800 overflow-hidden shadow-2xl">
                        <div className="flex items-center px-6 py-4 border-b border-neutral-900 bg-neutral-950">
                            <div className="flex gap-2">
                                <Code className="w-4 h-4 text-neutral-600" />
                            </div>
                            <div className="w-full flex justify-center text-[10px] font-black uppercase tracking-widest font-outfit text-neutral-700 italic">
                                Terminal Access Hub
                            </div>
                        </div>
                        <div className="p-8 overflow-x-auto">
                            <pre className="text-blue-500 font-mono text-base leading-relaxed">
                                <code className="italic font-bold tracking-tight">{code}</code>
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </motion.div>
);

export default GitGuidePage;
