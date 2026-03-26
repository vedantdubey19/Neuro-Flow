import React from 'react';
import { 
  Timer, 
  Pause, 
  Play, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Battery 
} from 'lucide-react';
import { cn } from '../utils/cn';
import { ProductivityRing } from './ProductivityRing';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const Dashboard = ({ 
  score, 
  focusSeconds, 
  distractions, 
  energy, 
  setEnergy, 
  isFocusActive, 
  setIsFocusActive, 
  tasks, 
  toggleTask, 
  addTask,
  completedCount
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Stats */}
      <div className="lg:col-span-4 space-y-6">
        <div className="card flex flex-col items-center">
          <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Daily Performance</h3>
          <ProductivityRing score={score} />
          <div className="mt-8 grid grid-cols-2 gap-4 w-full">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Focus Time</div>
              <div className="text-xl font-mono font-bold">{formatTime(focusSeconds)}</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Distractions</div>
              <div className="text-xl font-mono font-bold text-coral">{distractions}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Energy Level</h3>
            <Battery className={cn("w-5 h-5", energy > 20 ? "text-mint" : "text-coral")} />
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={energy} 
            onChange={(e) => setEnergy(parseInt(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent mb-4"
          />
          <div className="flex justify-between font-mono text-lg font-bold">
            <span>0%</span>
            <span className="text-accent">{energy}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Middle Column: Timer & Tasks */}
      <div className="lg:col-span-8 space-y-6">
        <div className="card overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className={cn(
                "w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                isFocusActive ? "border-mint/50 animate-pulse-glow" : "border-white/10"
              )}>
                <Timer className={cn("w-10 h-10", isFocusActive ? "text-mint" : "text-white/20")} />
              </div>
              <div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Active Session</div>
                <div className="text-4xl font-mono font-bold tracking-tighter">
                  {formatTime(focusSeconds)}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsFocusActive(!isFocusActive)}
              className={cn(
                "w-full md:w-auto px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all",
                isFocusActive 
                  ? "bg-coral/10 text-coral border border-coral/20 hover:bg-coral/20" 
                  : "bg-mint/10 text-mint border border-mint/20 hover:bg-mint/20"
              )}
            >
              {isFocusActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span className="text-sm font-bold uppercase tracking-widest">{isFocusActive ? 'Pause' : 'Start Focus'}</span>
            </button>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Task Queue</h3>
            <div className="text-xs text-white/40 font-mono">{completedCount}/{tasks.length} Done</div>
          </div>
          
          <div className="space-y-3 mb-6">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 border border-dashed border-white/5 rounded-xl opacity-40">
                <CheckCircle2 className="w-8 h-8 mb-2" />
                <p className="text-xs font-medium uppercase tracking-widest">No active tasks</p>
              </div>
            ) : (
              tasks.map(task => (
                <div 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group",
                    task.completed 
                      ? "bg-white/[0.02] border-white/5 opacity-50" 
                      : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.08]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-mint" />
                    ) : (
                      <Circle className="w-5 h-5 text-white/20 group-hover:text-accent" />
                    )}
                    <div>
                      <div className={cn("text-sm font-medium", task.completed && "line-through")}>{task.title}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-mono text-white/40">{task.time}</span>
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-tight",
                          task.difficulty === 'hard' ? 'text-coral bg-coral/10' :
                          task.difficulty === 'medium' ? 'text-amber bg-amber/10' : 'text-mint bg-mint/10'
                        )}>
                          {task.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-white/40">{task.duration}m</div>
                </div>
              ))
            )}
          </div>

          <div className="relative">
            <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="Add a new task..." 
              onKeyDown={addTask}
              className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-accent/40 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
