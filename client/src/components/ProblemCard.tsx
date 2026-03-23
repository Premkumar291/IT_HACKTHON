import { ShieldAlert, Zap, Target, BookOpen } from 'lucide-react';

const ProblemCard = ({ problem }: { problem: any }) => {
    return (
        <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all group h-full flex flex-col hover:bg-neutral-900/80">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-neutral-800 text-[10px] font-bold text-neutral-400 uppercase tracking-widest group-hover:border-neutral-600 transition-colors">
                    <Target className="w-3 h-3 text-blue-500" />
                    ID: {problem.id}
                </div>
                <div className="flex items-center gap-2 group-hover:scale-110 transition-transform">
                   <DifficultyBadge difficulty={problem.difficulty} />
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-4 tracking-tight leading-tight font-outfit uppercase italic group-hover:text-blue-500 transition-colors flex-grow">
                {problem.title}
            </h3>
            
            <p className="text-neutral-500 text-sm mb-10 leading-relaxed font-medium line-clamp-3">
                {problem.description}
            </p>

            <div className="mt-auto pt-8 border-t border-neutral-800 flex items-center justify-between">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 group-hover:text-neutral-400 transition-colors">
                    Domain Protocol
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
                    {problem.domain.split(',')[0]}
                </div>
            </div>
        </div>
    );
};

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
    const tones = {
        Beginner: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        Intermediate: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        Advanced: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    };
    
    const icon = {
        Beginner: <BookOpen className="w-3.5 h-3.5" />,
        Intermediate: <Zap className="w-3.5 h-3.5" />,
        Advanced: <ShieldAlert className="w-3.5 h-3.5" />
    };

    return (
        <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${tones[difficulty as keyof typeof tones]}`}>
            {icon[difficulty as keyof typeof icon]}
            {difficulty}
        </span>
    );
};

export default ProblemCard;
