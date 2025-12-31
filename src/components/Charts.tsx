import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SimpleBarChartProps {
  data: { name: string; value: number }[];
  accentColor?: string; // We will default to CSS variable usage if not passed
}

export const SimpleBarChart = ({ data }: SimpleBarChartProps) => {
  return (
    <div className="h-[10rem] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{fontSize: 12, fill: 'var(--depth)'}} 
            interval={0} 
          />
          <YAxis hide />
          <Tooltip 
            cursor={{fill: 'var(--serenity)', opacity: 0.4}}
            contentStyle={{ 
                backgroundColor: 'var(--purity)', 
                border: '1px solid var(--serenity)', 
                borderRadius: '0.5rem',
                fontSize: '12px',
                color: 'var(--depth)',
                boxShadow: 'none'
            }}
          />
          {/* Added radius: 0.25rem (4px) to the top corners */}
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill="var(--radiance)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
