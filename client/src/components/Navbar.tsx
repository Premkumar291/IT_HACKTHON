import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Problems', path: '/problems' },
        { name: 'Git Guide', path: '/git-guide' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-neutral-800' : 'py-6 bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black group-hover:scale-105 transition-transform">
                        <Rocket className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white uppercase font-outfit">IT_27</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-white ${
                                location.pathname === link.path ? 'text-white' : 'text-neutral-400'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/register" className="btn-primary group">
                        Register Now
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="md:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 bg-black border-b border-neutral-800 p-6 flex flex-col gap-6 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium ${
                                    location.pathname === link.path ? 'text-white' : 'text-neutral-400'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link 
                            to="/register" 
                            onClick={() => setIsOpen(false)}
                            className="btn-primary"
                        >
                            Register Now
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
