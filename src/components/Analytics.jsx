import React from 'react';
import { cn } from '../utils/cn';

const GENERATE_HEATMAP = () => {
  const data = [];
  for (let d = 0; d < 7; d++) {
    const row = [];
    for (let h = 0; h < 16; h++) {
      let val = Math.random() * 0.3;
      if (d < 5 && h >= 3 && h <= 6) val += 0.5 + Math.random() * 0.2;
      if (d >= 5) val *= 0.5;
      row.push(Math.min(val, 1));
    }
    data.push(row);
  }
  return data;
};

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Focus Heatmap (7D)</h3>
          <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
            <div className="min-w-[400px] space-y-1">
              {GENERATE_HEATMAP().map((row, rIdx) => (
                <div key={rIdx} className="flex gap-1">
                  {row.map((val, cIdx) => (
                    <div 
                      key={cIdx} 
                      style={{ backgroundColor: `rgba(108, 143, 248, ${val})` }}
                      className="flex-1 aspect-square rounded-sm transition-all hover:scale-110 hover:z-10 cursor-help"
                      title={`Focus Index: ${Math.round(val * 100)}%`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-mono text-white/20 uppercase tracking-widest px-1">
            <span>6 AM</span>
            <span>1 PM</span>
            <span>9 PM</span>
          </div>
        </div>

        <div className="card">
          <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Weekly Performance</h3>
          <div className="flex items-end gap-3 h-48 px-2">
            {[65, 82, 45, 91, 78, 30, 84].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  style={{ height: `${v}%` }}
                  className={cn(
                    "w-full rounded-t-lg transition-all duration-1000",
                    i === 6 ? "bg-accent shadow-[0_0_15px_rgba(108,143,248,0.4)]" : "bg-white/10"
                  )}
                />
                <span className="text-[10px] font-mono text-white/40">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
