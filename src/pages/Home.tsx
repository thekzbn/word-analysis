import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeWords } from '../utils/analysis';
import wordList from '../data/top-5000-words.json';
import { BentoGrid, BentoItem } from '../components/Bento';
import { SimpleBarChart } from '../components/Charts';
import { Hash, Activity, Compass, Fingerprint, PieChart, ArrowUpRight, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Home = () => {
  const navigate = useNavigate();
  const [showThesis, setShowThesis] = useState(false);
  const data = useMemo(() => analyzeWords(wordList as string[]), []);

  const topLetters = data.overall.slice(0, 12).map(i => ({ name: i.letter, value: i.count }));
  const topStarts = data.startsWith.slice(0, 8).map(i => ({ name: i.letter, value: i.count }));

  const ButtonStyle = "text-xs font-bold text-radiance hover:text-heritage transition flex items-center justify-center gap-1 uppercase tracking-wide cursor-pointer bg-transparent border-none p-0 duration-500 ease-tiara";

  return (
    <div className="min-h-screen bg-purity text-depth font-sans p-6 md:p-12 transition-colors duration-500">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-radiance mb-2">
              Linguistic Analysis / @thekzbn
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-depth leading-none">
              Top 5000<br/>
              <span className="text-heritage">Words</span>
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-3xl font-medium text-depth tracking-tight">{data.totalWords.toLocaleString()}</div>
            <div className="text-xs uppercase tracking-widest text-depth/60">Words Analyzed</div>
          </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <BentoGrid>
          {/* Letter Frequency */}
          <BentoItem
            colSpan={5}
            rowSpan={2}
            title="Letter Frequency"
            description="A count of every letter found in the list. It reveals the primary building blocks used to form most common words."
            icon={<Activity size={16} />}
            header={<SimpleBarChart data={topLetters} />}
          >
             <div className="mt-24 flex justify-end">
                 <button onClick={() => navigate('/details/letters')} className={ButtonStyle}>
                    View Analysis <ArrowUpRight size={12} />
                 </button>
             </div>
          </BentoItem>

          {/* Word Structures */}
          <BentoItem
            colSpan={3}
            rowSpan={2}
            title="Word Structures"
            description="Tracking vowel and consonant patterns. These show the rhythmic shapes and skeletons of the language."
            icon={<Hash size={16} />}
          >
             <div className="space-y-2 mt-4">
                {data.patterns.slice(0, 6).map((p, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-serenity last:border-0 group cursor-default">
                        <span className="text-sm font-bold text-depth">{p.pattern}</span>
                        <div className="text-right">
                             <div className="text-xs text-depth/60">{p.count}</div>
                        </div>
                    </div>
                ))}
             </div>
             <div className="mt-24 text-center">
                 <button onClick={() => navigate('/details/patterns')} className={`${ButtonStyle} mx-auto`}>
                    Full Index <ArrowUpRight size={12} />
                 </button>
             </div>
          </BentoItem>

          {/* Starting Letters */}
          <BentoItem
            colSpan={3}
            title="Starting Letters"
            description="Identifying letters that begin words. This reveals how we naturally start our speech in daily communication."
            icon={<Compass size={16} />}
            header={<SimpleBarChart data={topStarts} />}
          >
             <div className="mt-24 flex justify-end">
                <button onClick={() => navigate('/details/positions')} className={ButtonStyle}>
                    Position Matrix <ArrowUpRight size={12} />
                </button>
             </div>
          </BentoItem>

          {/* Double Consonants */}
          <BentoItem
            colSpan={3}
            title="Double Consonants"
            description="Repeating consonants like 'tt' or 'ss'. This tracks specific sounds and stress points within the vocabulary."
            icon={<Fingerprint size={16} />}
          >
             <div className="mt-4 flex flex-col gap-2">
                {data.doubleLetters.slice(0, 3).map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-serenity/50 bg-serenity/5">
                         <div className="flex items-baseline gap-2">
                             <span className="text-2xl font-bold text-depth tracking-tighter uppercase">{d.pair}</span>
                             <span className="text-[10px] text-depth/40 uppercase font-bold tracking-widest">Pair</span>
                         </div>
                         <div className="text-right">
                            <span className="text-lg font-bold text-radiance">{d.count}</span>
                            <div className="text-[9px] text-depth/40 uppercase font-bold tracking-tighter">Occurrences</div>
                         </div>
                    </div>
                ))}
             </div>
             <div className="mt-24 flex justify-end">
                <button onClick={() => navigate('/details/doubles')} className={ButtonStyle}>
                    View All <ArrowUpRight size={12} />
                </button>
             </div>
          </BentoItem>

          {/* Vowel Saturation */}
          <BentoItem
            colSpan={2}
            title="Vowel Saturation"
            description="Words with the highest number of unique vowels. These are the most phonetically diverse examples in the list."
            icon={<PieChart size={16} />}
          >
             <div className="mt-2">
                <div className="text-5xl font-light text-depth mb-1 tracking-tighter">
                    {data.vowelCounts.find(c => c.count === 5)?.words.length || 0}
                </div>
                <div className="text-caption text-depth/60 uppercase font-bold tracking-widest">
                    Penta-Vowel words
                </div>
             </div>
             <div className="mt-24 flex justify-end">
                 <button onClick={() => navigate('/details/vowels')} className={ButtonStyle}>
                    Inspect <ArrowUpRight size={12} />
                 </button>
             </div>
          </BentoItem>

        </BentoGrid>

        {/* Project Thesis Section */}
        <section className="mt-24 max-w-readable mx-auto">
             <div className="flex items-center gap-4 py-4 border-b border-serenity">
                <h2 className="text-xs font-bold uppercase tracking-widest text-depth/80">Project Thesis</h2>
                <button 
                    onClick={() => setShowThesis(!showThesis)}
                    className="p-1.5 rounded-full border border-serenity text-depth hover:text-radiance hover:border-radiance transition duration-500 ease-tiara flex items-center justify-center"
                >
                    {showThesis ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
             </div>
             <AnimatePresence>
                 {showThesis && (
                     <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                     >
                         <div className="py-6 text-sm text-depth/70 leading-relaxed space-y-4 font-normal">
                             <p>
                                This page was created to analyze the top 5000 words in English. 
                                Some patterns appear when you begin to pay close attention to the English language. 
                                These patterns show us the habits that we have that make English special.
                             </p>
                             <p>
                                The results show us very interesting things about English that are honestly really fun to know.
                             </p>
                         </div>
                     </motion.div>
                 )}
             </AnimatePresence>
        </section>

        {/* Footer */}
        <footer className="mt-24 border-t border-serenity pt-8 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-depth/50 font-medium max-w-7xl mx-auto">
            <div className="mb-4 md:mb-0">
                 2025 @thekzbn
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
      </main>
    </div>
  );
};
