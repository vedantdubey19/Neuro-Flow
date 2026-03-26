import React from 'react';
import { 
  Clock, 
  CheckCircle2,
  Zap
} from 'lucide-react';
import { cn } from '../utils/cn';

export const Schedule = ({ tasks, toggleTask, onOptimize }) => {
  return (
    <div className="card space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Intelligence Schedule</h2>
          <p className="text-white/40 text-sm mt-1">AI has optimized your timeline based on peak energy windows.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onOptimize}
            className="px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-accent/20 transition-all flex items-center gap-2"
          >
            <Zap className="w-3 h-3" />
            Optimize Now
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-mint/5 border border-mint/10 rounded-full">
            <div className="w-1.5 h-1.5 bg-mint rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-mint uppercase tracking-widest">RL Agent Active</span>
          </div>
        </div>
      </div>

      <div className="relative pl-8 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
        {[...tasks].sort((a, b) => a.time.localeCompare(b.time)).map((task) => (
          <div key={task.id} className="relative">
            <div className={cn(
              "absolute -left-[30px] top-1.5 w-3 h-3 rounded-full border-2 bg-background z-10",
              task.energy === 'high' ? 'border-coral' : task.energy === 'medium' ? 'border-amber' : 'border-mint'
            )} />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-6">
                <div className="w-16 text-sm font-mono font-bold text-accent">{task.time}</div>
                <div>
                  <h4 className="font-bold">{task.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-white/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {task.duration} min
                    </span>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      task.energy === 'high' ? 'text-coral' : task.energy === 'medium' ? 'text-amber' : 'text-mint'
                    )}>
                      {task.energy} Energy
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {task.completed ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-mint/10 text-mint text-[10px] font-bold uppercase rounded-full border border-mint/20">
                    <CheckCircle2 className="w-3 h-3" /> Done
                  </div>
                ) : (
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-white/10 rounded-full hover:bg-white/5 transition-colors"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
