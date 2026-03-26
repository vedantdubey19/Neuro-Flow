/**
 * Smart Scheduler Logic
 * Simulates a Reinforcement Learning agent that optimizes tasks
 * based on user energy levels and peak productivity windows.
 */

const ENERGY_WINDOWS = [
  { start: "08:00", end: "12:00", level: "high" },
  { start: "12:00", end: "14:00", level: "medium" },
  { start: "14:00", end: "16:00", level: "low" }, // Post-lunch slump
  { start: "16:00", end: "19:00", level: "medium" },
  { start: "19:00", end: "22:00", level: "low" }
];

export const optimizeSchedule = (tasks) => {
  // 1. Separate completed and pending tasks
  const completed = tasks.filter(t => t.completed);
  const pending = tasks.filter(t => !t.completed);

  // 2. Sort pending tasks by energy requirement (high first)
  // and difficulty (hard first)
  const sortedPending = [...pending].sort((a, b) => {
    const energyOrder = { high: 3, medium: 2, easy: 1 };
    const diffOrder = { hard: 3, medium: 2, easy: 1 };
    
    if (energyOrder[a.energy] !== energyOrder[b.energy]) {
      return energyOrder[b.energy] - energyOrder[a.energy];
    }
    return diffOrder[b.difficulty] - diffOrder[a.difficulty];
  });

  // 3. Assign times based on sorted order starting from the current window or 9 AM
  const optimized = sortedPending.map((task, index) => {
    // Simple time assignment for prototype: 9:00, 10:00, 11:30, etc.
    // In a real RL app, this would be based on historical performance.
    const hours = 9 + Math.floor(index * 1.5);
    const timeStr = `${hours.toString().padStart(2, '0')}:00`;
    return { ...task, time: timeStr };
  });

  return [...completed, ...optimized];
};
