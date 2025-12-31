import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface BentoGridProps {
  className?: string;
  children: ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        // Grid gap: 1rem (spacing.4)
        "grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoItemProps {
  className?: string;
  title: string;
  description?: string;
  header?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; 
  rowSpan?: 1 | 2; 
}

export const BentoItem = ({
  className,
  title,
  description,
  header,
  icon,
  children,
  colSpan = 2,
  rowSpan = 1,
}: BentoItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.57, -0.01, 0.21, 0.89] }}
      className={cn(
        "group relative flex flex-col justify-between",
        "bg-purity border border-serenity p-3 rounded", // p-3 is 0.75rem, rounded is 1rem (DEFAULT in config)
        "hover:border-radiance transition-colors duration-500 ease-tiara",
        
        // Column Spans
        colSpan === 1 && "md:col-span-1",
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "md:col-span-3",
        colSpan === 4 && "md:col-span-4",
        colSpan === 5 && "md:col-span-5",
        colSpan === 6 && "md:col-span-6",
        colSpan === 7 && "md:col-span-7",
        colSpan === 8 && "md:col-span-8",
        
        // Row Spans
        rowSpan === 1 && "row-span-1",
        rowSpan === 2 && "row-span-2",

        className
      )}
    >
      <div>
        {/* Title margin-bottom: 0.75rem (mb-3) */}
        {/* Icon gap: 0.25rem (gap-1) */}
        <div className="flex items-center gap-1 mb-3">
          {icon && <div className="text-radiance">{icon}</div>}
          {/* Weight 700 (bold) */}
          <h3 className="text-sm font-bold text-depth tracking-tight uppercase">
            {title}
          </h3>
        </div>
        
        {/* Gap between title and description is handled by the mb-3 of the title container above? 
            No, the audit says "The gap between a title and a sub-description must be exactly 0.75rem".
            So margin-bottom on title should be 0.75rem. 
        */}
        {description && (
          // Caption size: 0.875rem, Weight 400
          <p className="text-caption text-depth/70 font-normal leading-relaxed max-w-[90%]">
            {description}
          </p>
        )}
      </div>
      
      <div className="mt-6">
        {header}
        {children}
      </div>
    </motion.div>
  );
};
