import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { analyzeWords } from '../utils/analysis';
import wordList from '../data/top-5000-words.json';
import { SimpleBarChart } from '../components/Charts';
import { ArrowLeft, X, ChevronDown, ChevronUp, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitHubModal } from '../components/GitHubModal';

export const Detail = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const data = useMemo(() => analyzeWords(wordList as string[]), []);
  const [selectedPattern, setSelectedPattern] = useState<{pattern: string, words: string[]} | null>(null);
  const [showDesc, setShowDesc] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  const getPageInfo = () => {
    switch (type) {
      case 'letters':
        return {
          title: "Character Distribution",
          desc: "Analyzing how each letter is used across different parts of a word reveals the structural weight of the English alphabet. It’s fascinating to see which letters carry the load and which ones only appear in specific spots."
        };
      case 'positions':
        return {
          title: "Positional Matrix",
          desc: "Where a word starts and where it ends tells a story about how we package information. This matrix shows the preferred 'bookends' of our vocabulary and how they differ from each other."
        };
      case 'patterns':
        return {
          title: "Phonological Patterns",
          desc: "Words have shapes. By looking at vowel and consonant sequences, we can see the rhythmic bones of English. It turns out that English follows some very predictable, yet surprisingly musical patterns."
        };
      case 'doubles':
        return {
          title: "Geminate Consonants",
          desc: "Repeating letters are like a heartbeat within a word. Tracking these double consonants shows the specific emphasis and sounds that we find most comfortable in our daily speech."
        };
      case 'vowels':
        return {
          title: "Vowel Saturation",
          desc: "Some words are simple, while others are packed with vowels. Seeing how English handles these 'pockets of air' shows us the difference between the most basic and the most phonetically rich words we use."
        };
      default:
        return { title: "Analysis", desc: "" };
    }
  };

  const { title, desc } = getPageInfo();

  const renderContent = () => {
    switch (type) {
      case 'letters':
        return (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-serenity border border-serenity rounded overflow-hidden">
               {data.breakdown.map((item) => (
                   <div key={item.letter} className="bg-purity p-6 hover:bg-serenity/10 transition duration-500 ease-tiara group">
                       <div className="flex justify-between items-end mb-6">
                           <span className="text-4xl font-bold text-depth group-hover:text-radiance transition duration-500">{item.letter}</span>
                           <div className="text-right">
                               <div className="text-xs text-depth">{item.total.toLocaleString()}</div>
                               <div className="text-[10px] uppercase font-bold text-depth/50 tracking-widest">Total Count</div>
                           </div>
                       </div>
                       <div className="space-y-3">
                           <PositionMetric label="Start" count={item.begin} pct={item.beginPct} />
                           <PositionMetric label="Middle" count={item.middle} pct={item.middlePct} />
                           <PositionMetric label="End" count={item.end} pct={item.endPct} />
                       </div>
                   </div>
               ))}
            </div>
          </div>
        );
      case 'positions':
        return (
             <div className="space-y-12">
                <div className="grid grid-cols-1 gap-px bg-serenity border border-serenity rounded overflow-hidden">
                    <div className="bg-purity p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-8 w-1 bg-radiance"></div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-depth">Onset (Start) Distribution</h3>
                        </div>
                        <SimpleBarChart data={data.startsWith.map(x => ({name: x.letter, value: x.count}))} />
                    </div>
                     <div className="bg-purity p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-8 w-1 bg-heritage"></div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-depth">Coda (End) Distribution</h3>
                        </div>
                        <SimpleBarChart data={data.endsWith.map(x => ({name: x.letter, value: x.count}))} />
                    </div>
                </div>
            </div>
        );
      case 'patterns':
        return (
             <div className="space-y-12 relative">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-serenity border border-serenity rounded overflow-hidden">
                    {data.patterns.map((pat, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => setSelectedPattern({ pattern: pat.pattern, words: pat.words })}
                            className="bg-purity p-6 flex flex-col justify-between hover:bg-serenity/10 transition duration-500 ease-tiara group cursor-pointer"
                        >
                             <div>
                                <div className="text-2xl font-bold text-depth mb-1 group-hover:text-radiance transition duration-500">{pat.pattern}</div>
                                <div className="text-[10px] uppercase font-bold text-depth/50 tracking-widest">{pat.count} Observations</div>
                             </div>
                             <div className="mt-8 pt-4 border-t border-serenity flex justify-between items-end">
                                 <div>
                                     <span className="text-[9px] uppercase font-bold text-depth/70 block mb-1">Representative:</span>
                                     <span className="text-sm font-bold text-depth">{pat.example}</span>
                                 </div>
                                 <span className="text-[10px] uppercase font-bold text-radiance opacity-0 group-hover:opacity-100 transition-opacity duration-500">View List</span>
                             </div>
                        </div>
                    ))}
                 </div>
                 
                 <AnimatePresence>
                     {selectedPattern && (
                         <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="fixed inset-0 bg-purity/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                             onClick={() => setSelectedPattern(null)}
                         >
                             <motion.div 
                                 initial={{ y: 20, opacity: 0 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 exit={{ y: 20, opacity: 0 }}
                                 className="bg-purity border border-serenity w-full max-w-2xl max-h-[80vh] flex flex-col shadow-none rounded overflow-hidden"
                                 onClick={e => e.stopPropagation()}
                             >
                                 <div className="p-6 border-b border-serenity flex justify-between items-center">
                                     <div>
                                         <h3 className="text-2xl font-bold text-depth tracking-tight">{selectedPattern.pattern}</h3>
                                         <span className="text-xs uppercase tracking-widest text-depth/60">{selectedPattern.words.length} Matches Found</span>
                                     </div>
                                     <button onClick={() => setSelectedPattern(null)} className="text-depth hover:text-heritage transition">
                                         <X size={24} />
                                     </button>
                                 </div>
                                 <div className="p-6 overflow-y-auto">
                                     <div className="flex flex-wrap gap-3">
                                         {selectedPattern.words.map((word, i) => (
                                             <span key={i} className="px-2 py-1 bg-serenity/20 border border-serenity text-xs text-depth rounded-sm">
                                                 {word}
                                             </span>
                                         ))}
                                     </div>
                                 </div>
                             </motion.div>
                         </motion.div>
                     )}
                 </AnimatePresence>
             </div>
        );
      case 'doubles':
          return (
             <div className="space-y-12">
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-serenity border border-serenity rounded overflow-hidden">
                    {data.doubleLetters.map((item, idx) => (
                        <div key={idx} className="bg-purity p-6 hover:bg-serenity/10 transition duration-500 ease-tiara">
                             <div className="text-4xl font-bold text-depth mb-2">{item.pair}</div>
                             <div className="text-[10px] font-bold text-depth/60 uppercase mb-4">{item.count} Detected</div>
                             <div className="text-[10px] text-depth/70 space-y-1">
                                 {item.examples.slice(0,3).map(ex => <div key={ex} className="border-l border-serenity pl-2">{ex}</div>)}
                             </div>
                        </div>
                    ))}
                 </div>
             </div>
        );
       case 'vowels':
          return (
             <div className="space-y-12">
                <div className="space-y-px bg-serenity border border-serenity rounded overflow-hidden">
                    {data.vowelCounts.map((grp) => (
                        <div key={grp.count} className="bg-purity p-8 flex flex-col md:flex-row gap-8 hover:bg-serenity/5 transition duration-500 ease-tiara">
                            <div className="md:w-1/3">
                                <h3 className="text-2xl font-bold text-depth uppercase tracking-tight mb-1">{grp.count} Unique Vowels</h3>
                                <div className="text-xs font-bold text-depth/60 uppercase tracking-widest">{grp.words.length} Words Found</div>
                            </div>
                            <div className="flex-grow">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-depth/70 mb-2 block">Longest Structural Example</span>
                                        <div className="text-2xl font-bold text-radiance tracking-widest uppercase">{grp.longest}</div>
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-depth/70 mb-2 block">Shortest Structural Example</span>
                                        <div className="text-2xl font-bold text-heritage tracking-widest uppercase">{grp.shortest}</div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-depth/70 mb-2 block">Sample Set</span>
                                    <div className="flex flex-wrap gap-2">
                                        {grp.words.slice(0, 30).map(w => (
                                            <span key={w} className="text-[11px] text-depth/60 hover:text-depth transition cursor-default">
                                                {w}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        );
      default:
        return <div>Invalid Dataset</div>;
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 bg-purity text-depth font-sans selection:bg-radiance selection:text-depth transition-colors duration-500">
        <GitHubModal isOpen={isGitHubModalOpen} onClose={() => setIsGitHubModalOpen(false)} />
        
        <div className="max-w-7xl mx-auto">
             <div className="flex justify-between items-center mb-12">
               <button 
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-radiance hover:text-heritage transition duration-500 ease-tiara group"
               >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  Return to Matrix
               </button>
               <button 
                  onClick={() => setIsGitHubModalOpen(true)}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-depth/40 hover:text-radiance transition-colors duration-500"
               >
                  <PenTool size={12} />
                  <span>Edit on GitHub</span>
               </button>
             </div>

            <section className="mb-12">
                 <div className="flex items-center gap-4 py-4">
                    <h2 className="text-4xl font-bold text-depth tracking-tight">{title}</h2>
                    <button 
                        onClick={() => setShowDesc(!showDesc)}
                        className="p-1.5 rounded-full border border-serenity text-depth hover:text-radiance hover:border-radiance transition duration-500 ease-tiara flex items-center justify-center"
                    >
                        {showDesc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                 </div>
                 <AnimatePresence>
                     {showDesc && (
                         <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                         >
                             <div className="pb-6 text-sm text-depth/70 leading-relaxed max-w-readable font-normal">
                                {desc}
                             </div>
                         </motion.div>
                     )}
                 </AnimatePresence>
            </section>

            <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.5, ease: [0.57, -0.01, 0.21, 0.89] }}
            >
                {renderContent()}
            </motion.div>

            {/* Footer */}
            <footer className="mt-24 border-t border-serenity pt-8 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-depth/50 font-medium">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-4 md:mb-0">
                    <span>2025 @thekzbn</span>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsGitHubModalOpen(true)} className="hover:text-radiance transition duration-500 flex items-center gap-1 uppercase tracking-widest text-[10px] font-bold bg-transparent border-none p-0 cursor-pointer">
                            <PenTool size={14} /> Edit
                        </button>
                        <a href="https://github.com/thekzbn/" target="_blank" rel="noopener noreferrer" className="hover:text-radiance transition duration-500 flex items-center gap-1">
                            <Github size={14} /> GitHub
                        </a>
                        <a href="https://x.com/thekzbn_me" target="_blank" rel="noopener noreferrer" className="hover:text-radiance transition duration-500 flex items-center gap-1">
                            <Twitter size={14} /> X
                        </a>
                        <a href="https://thekzbn.name.ng" target="_blank" rel="noopener noreferrer" className="hover:text-radiance transition duration-500 flex items-center gap-1">
                            <Globe size={14} /> My Site
                        </a>
                    </div>
                </div>
                <a 
                    href="/top-5000-words.txt" 
                    download 
                    className="flex items-center gap-1 hover:text-radiance transition duration-500 ease-tiara"
                >
                    <Download size={14} />
                    Raw Data (.txt)
                </a>
            </footer>
        </div>
    </div>
  );
};

const PositionMetric = ({ label, count, pct }: { label: string, count: number, pct: number }) => (
    <div>
        <div className="flex justify-between items-baseline mb-1">
            <span className="text-[9px] uppercase font-bold text-depth/60 tracking-tighter">{label}</span>
            <span className="text-[9px] text-depth/80">{count} ({pct}%)</span>
        </div>
        <div className="h-px w-full bg-serenity overflow-hidden">
            <div style={{ width: `${pct}%` }} className="h-full bg-radiance"></div>
        </div>
    </div>
)
