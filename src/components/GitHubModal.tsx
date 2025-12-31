import { X, Github, Star, GitFork, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal = ({ isOpen, onClose }: GitHubModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-purity/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.57, -0.01, 0.21, 0.89] }}
            className="bg-purity border border-serenity w-full max-w-readable p-12 relative flex flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-depth/40 hover:text-depth transition-colors duration-500"
            >
              <X size={20} />
            </button>

            <div className="p-4 rounded-full border border-serenity mb-6 text-radiance">
              <Github size={32} />
            </div>

            <h2 className="text-3xl font-bold tracking-tight mb-4 text-depth">
              Contribute to the Research
            </h2>

            <p className="text-sm text-depth/70 leading-relaxed mb-8 max-w-md">
              The English Analysis project is open for refinement. You are encouraged to explore the source code, suggest improvements, or adapt the algorithm for your own linguistic studies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12">
              <div className="p-6 border border-serenity rounded-lg flex flex-col items-center gap-2">
                <Star size={20} className="text-heritage" />
                <span className="text-xs font-bold uppercase tracking-widest text-depth/60">Support</span>
                <p className="text-xs text-depth/80">If you find this analysis helpful, please consider leaving a star.</p>
              </div>
              <div className="p-6 border border-serenity rounded-lg flex flex-col items-center gap-2">
                <GitFork size={20} className="text-heritage" />
                <span className="text-xs font-bold uppercase tracking-widest text-depth/60">Extend</span>
                <p className="text-xs text-depth/80">You are free to fork this repository and build upon the findings.</p>
              </div>
            </div>

            <a 
              href="https://github.com/thekzbn/word-analysis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs font-bold text-radiance hover:text-heritage transition-colors duration-500 uppercase tracking-[0.2em]"
            >
              Go to Repository <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
