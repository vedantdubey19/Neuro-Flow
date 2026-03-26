import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  Calendar, 
  LayoutDashboard, 
  MessageSquare, 
  Zap 
} from 'lucide-react';
import { cn } from './utils/cn';
import { useLocalStorage } from './hooks/useLocalStorage';

// Components
import { Dashboard } from './components/Dashboard';
import { Schedule } from './components/Schedule';
import { Analytics } from './components/Analytics';
import { Coach } from './components/Coach';

// --- Seed Data ---
const SEED_TASKS = [
  { id: '1', title: "Deep Work: System Design", duration: 90, difficulty: "hard", energy: "high", time: "09:00", completed: false },
  { id: '2', title: "Code Review PR #142", duration: 30, difficulty: "medium", energy: "medium", time: "10:30", completed: false },
  { id: '3', title: "Write unit tests", duration: 60, difficulty: "medium", energy: "medium", time: "11:00", completed: true },
  { id: '4', title: "Team standup", duration: 15, difficulty: "easy", energy: "easy", time: "12:00", completed: true },
  { id: '5', title: "Research: RL algorithms", duration: 45, difficulty: "hard", energy: "high", time: "14:00", completed: false },
  { id: '6', title: "Reply to emails", duration: 20, difficulty: "easy", energy: "easy", time: "17:00", completed: false },
];

import { optimizeSchedule } from './utils/scheduler';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Persistent State
  const [tasks, setTasks] = useLocalStorage('nf-tasks', SEED_TASKS);
  const [energy, setEnergy] = useLocalStorage('nf-energy', 75);
  const [focusSeconds, setFocusSeconds] = useLocalStorage('nf-focus-seconds', 0);
  const [distractions, setDistractions] = useLocalStorage('nf-distractions', 0);
  
  // Non-persistent UI state
  const [isFocusActive, setIsFocusActive] = useState(false);
  const [insight, setInsight] = useState(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  
  const timerRef = useRef(null);

  // Productivity Score Calculation
  const completedCount = tasks.filter(t => t.completed).length;
  const progressScore = (completedCount / tasks.length) * 50;
  const focusScore = Math.min((focusSeconds / 3600) * 50, 50); 
  const score = Math.round(progressScore + focusScore);

  useEffect(() => {
    if (isFocusActive) {
      timerRef.current = setInterval(() => {
        setFocusSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isFocusActive, setFocusSeconds]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && isFocusActive) {
        setDistractions(prev => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isFocusActive, setDistractions]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleOptimize = () => {
    setTasks(optimizeSchedule(tasks));
  };

  const addTask = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: e.target.value,
        duration: 30,
        difficulty: "medium",
        energy: "medium",
        time: "Next",
        completed: false
      };
      setTasks([...tasks, newTask]);
      e.target.value = '';
    }
  };

  const handleResetAll = () => {
    if (confirm("Reset all tasks and metrics? This cannot be undone.")) {
      setTasks(SEED_TASKS);
      setEnergy(75);
      setFocusSeconds(0);
      setDistractions(0);
      setInsight(null);
      window.localStorage.clear();
    }
  };

  const getAIInsight = async () => {
    setLoadingInsight(true);
    
    // Advanced simulated reasoning
    setTimeout(() => {
      let response = "You perform exceptionally well in high-energy windows; consider moving 'Deep Work' 30 minutes earlier. Your distraction rate is low, suggesting deep flow is being maintained effectively.";
      
      if (distractions > 5) {
        response = "Your focus is being fragmented by frequent task switching (${distractions} interruptions). I've noted a 14% drop in efficiency. Try 'Monotasking' for your next 30-minute block.";
      } else if (energy < 40 && completedCount < tasks.length / 2) {
        response = "Data indicates a 'High Difficulty' task bottleneck during an 'Energy Slump' (${energy}%). Recommendation: Pivot to 3 'Easy' tasks or a 20-minute restorative walk to reset dopamine levels.";
      } else if (focusSeconds > 3600 && energy > 60) {
        response = "You are currently in a high-performance flow state (1hr+ deep work). The scheduler has reserved your next 45 minutes for complex problem-solving. Stay in the zone.";
      } else if (completedCount === tasks.length) {
        response = "Full task completion achieved. Your productivity score is peaking at ${score}. Data suggest your evening recovery window is critical; avoid starting new complex projects after 7:00 PM.";
      }
      
      setInsight(response);
      setLoadingInsight(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent/30">
      {/* Navigation */}
      <nav className="h-16 border-b border-white/5 px-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight font-sans">NeuroFlow</span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'coach', label: 'Coach', icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-white/40 hover:text-white/60"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-accent" : "")} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleResetAll}
            className="text-[10px] text-white/20 hover:text-coral transition-colors uppercase tracking-widest font-bold hidden sm:inline"
          >
            Reset All
          </button>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isFocusActive ? "bg-mint animate-pulse shadow-[0_0_8px_rgba(61,220,151,0.6)]" : "bg-white/20"
            )} />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest hidden sm:inline">
              {isFocusActive ? 'Focus Active' : 'Standby'}
            </span>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-x-hidden p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
          {activeTab === 'dashboard' && (
            <Dashboard 
              score={score}
              focusSeconds={focusSeconds}
              distractions={distractions}
              energy={energy}
              setEnergy={setEnergy}
              isFocusActive={isFocusActive}
              setIsFocusActive={setIsFocusActive}
              tasks={tasks}
              toggleTask={toggleTask}
              addTask={addTask}
              completedCount={completedCount}
            />
          )}

          {activeTab === 'schedule' && (
            <Schedule 
              tasks={tasks}
              toggleTask={toggleTask}
              onOptimize={handleOptimize}
            />
          )}

          {activeTab === 'analytics' && (
            <Analytics />
          )}

          {activeTab === 'coach' && (
            <Coach 
              distractions={distractions}
              loadingInsight={loadingInsight}
              getAIInsight={getAIInsight}
              insight={insight}
            />
          )}
        </div>
      </main>

      <footer className="py-8 px-8 border-t border-white/5 text-center">
        <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">
          Protocol v1.0 // Adaptive RL Engine Active
        </p>
      </footer>
    </div>
  );
}
