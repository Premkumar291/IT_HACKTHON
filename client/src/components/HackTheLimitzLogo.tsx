import { motion } from 'framer-motion';

const HackTheLimitzLogo = ({ className = "w-40" }: { className?: string }) => {
  return (
    <motion.svg 
      viewBox="0 0 220 80" 
      className={className}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="neon-pink" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur3" />
          <feMerge>
            <feMergeNode in="blur3" />
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="neon-purple" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur3" />
          <feMerge>
            <feMergeNode in="blur3" />
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.text
        x="110"
        y="32"
        textAnchor="middle"
        className="font-outfit font-black italic fill-[#f9a8d4]"
        fontSize="26"
        letterSpacing="2"
        filter="url(#neon-pink)"
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          },
          hover: {
            scale: 1.05,
            transition: { duration: 0.3 }
          }
        }}
        animate={{ 
          opacity: [0.85, 1, 0.85],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        HACK THE
      </motion.text>

      <motion.text
        x="110"
        y="70"
        textAnchor="middle"
        className="font-outfit font-black italic fill-white"
        fontSize="44"
        letterSpacing="4"
        filter="url(#neon-purple)"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
          },
          hover: {
            scale: 1.05,
            transition: { duration: 0.3 }
          }
        }}
        animate={{ 
          opacity: [0.9, 1, 0.9],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        LIMITZ
      </motion.text>
    </motion.svg>
  );
};

export default HackTheLimitzLogo;
