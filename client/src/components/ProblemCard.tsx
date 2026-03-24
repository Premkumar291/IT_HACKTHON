import { Target, ArrowUpRight } from 'lucide-react';
import type { Problem } from '../data/problems';

const ProblemCard = ({ problem, onClick }: { problem: Problem, onClick?: () => void }) => {
    return (
        <button 
            onClick={onClick}
            className="w-full p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 transition-all group h-full flex flex-col hover:bg-neutral-900/60 text-left relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                <ArrowUpRight className="w-5 h-5 text-blue-500" />
            </div>

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-neutral-800 text-[10px] font-bold text-neutral-400 uppercase tracking-widest group-hover:border-neutral-700 transition-colors">
                    <Target className="w-3 h-3 text-blue-500" />
                    ID: {problem.id}
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-4 tracking-tight leading-tight font-outfit uppercase italic group-hover:text-blue-500 transition-colors flex-grow">
                {problem.title}
            </h3>
            
            <p className="text-neutral-500 text-xs mb-10 leading-relaxed font-medium line-clamp-2">
                {problem.description}
            </p>

            <div className="mt-auto pt-6 border-t border-neutral-800 flex items-center justify-between w-full">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 group-hover:text-neutral-400 transition-colors">
                    Track
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
                    {problem.domain.split(',')[0]}
                </div>
            </div>
        </button>
    );
};

export default ProblemCard;
