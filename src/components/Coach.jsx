import React from 'react';
import { 
  MessageSquare, 
  Timer, 
  Flame, 
  AlertCircle, 
  Battery, 
  Zap 
} from 'lucide-react';

export const Coach = ({ distractions, loadingInsight, getAIInsight, insight }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="card bg-accent/5 border-accent/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <MessageSquare className="w-32 h-32 text-accent" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">NeuroFlow AI Coach</h2>
          <p className="text-white/60 mb-8 max-w-md">Get data-driven insights based on your current energy levels, focus metrics, and task complexity.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Avg Focus', val: '42m', icon: Timer },
              { label: 'Flow State', val: 'High', icon: Flame },
              { label: 'Distraction', val: distractions, icon: AlertCircle },
              { label: 'Recovery', val: '2h', icon: Battery },
            ].map((stat, i) => (
              <div key={i} className="bg-background/50 p-4 rounded-xl border border-white/5">
                <stat.icon className="w-4 h-4 text-accent mb-2" />
                <div className="text-xl font-mono font-bold">{stat.val}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <button 
            disabled={loadingInsight}
            onClick={getAIInsight}
            className="btn-accent px-8 py-4 flex items-center gap-3 disabled:opacity-50"
          >
            {loadingInsight ? (
              <div className="flex gap-1 items-center">
                <div className="loading-dot" />
                <div className="loading-dot" />
                <div className="loading-dot" />
              </div>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Get Daily Strategy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {insight && (
        <div className="animate-fade-in-up">
          <div className="bg-surface border-l-4 border-accent p-6 rounded-r-xl shadow-lg">
            <div className="flex items-center gap-2 text-accent mb-3">
              <AlertCircle className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">⚡ AI INSIGHT</span>
            </div>
            <p className="text-lg font-medium leading-relaxed italic">
              "{insight}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
