import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Globe } from 'lucide-react';
import HackTheLimitzLogo from './HackTheLimitzLogo';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-neutral-900 pt-24 pb-12 relative overflow-hidden selection:bg-neutral-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                <div className="col-span-1 md:col-span-2">
                    <Link to="/" className="inline-block mb-8">
                        <HackTheLimitzLogo className="w-48" />
                    </Link>
                    <p className="text-neutral-500 text-lg font-medium max-w-sm mb-10 leading-relaxed italic">
                        The premiere hackathon for the next generation of engineers.
                    </p>
                    <div className="flex items-center gap-4">
                        <SocialLink icon={<Github className="w-5 h-5" />} />
                        <SocialLink icon={<Twitter className="w-5 h-5" />} />
                        <SocialLink icon={<Linkedin className="w-5 h-5" />} />
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-black font-outfit uppercase tracking-[0.2em] text-xs mb-8">Navigation</h4>
                    <ul className="space-y-4">
                        <FooterLink to="/">Home Hub</FooterLink>
                        <FooterLink to="/problems">Project Tracks</FooterLink>
                        <FooterLink to="/register">Registration</FooterLink>
                        <FooterLink to="/git-guide">Git Guide</FooterLink>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-black font-outfit uppercase tracking-[0.2em] text-xs mb-8">Information</h4>
                    <ul className="space-y-4">
                        <li className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">Inter-Dept Hackathon</li>
                        <li className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">Information Technology</li>
                        <li className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">Team Size: Up to 4</li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-8">
                <p className="text-neutral-600 font-bold uppercase tracking-widest text-[10px]">
                    © {new Date().getFullYear()} IT_27 HACKATHON. ALL RIGHTS RESERVED.
                </p>
                <div className="flex items-center gap-2 text-neutral-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    <Globe className="w-3 h-3 text-neutral-500" />
                    <span>Global Edition</span>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ icon }: { icon: React.ReactNode }) => (
    <a href="#" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-xl">
        {icon}
    </a>
);

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <li>
        <Link to={to} className="text-neutral-500 hover:text-white font-bold uppercase tracking-widest text-[10px] transition-colors flex items-center gap-2 group">
            <span className="w-1 h-1 bg-white/0 group-hover:bg-white rounded-full transition-all" />
            {children}
        </Link>
    </li>
);

export default Footer;
