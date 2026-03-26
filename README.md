🧠 NeuroFlow AI Productivity System v2

An AI-powered productivity system that optimizes your schedule, tracks focus, and provides intelligent coaching using heuristic reinforcement logic.

Built with a modular architecture and persistent state, NeuroFlow evolves from a simple tracker into a smart decision-making assistant.

🚀 Live Concept

NeuroFlow is not just a task manager — it’s a behavior-aware productivity engine that:

Optimizes your schedule dynamically
Tracks real focus vs distractions
Adapts to your energy levels
Provides AI-driven productivity insights
✨ Features
🧩 Modular Architecture
Clean, scalable component structure
Separation of concerns for maintainability
src/
 ┣ components/
 ┃ ┣ Dashboard.jsx
 ┃ ┣ Schedule.jsx
 ┃ ┣ Analytics.jsx
 ┃ ┗ Coach.jsx
 ┣ hooks/
 ┃ ┗ useLocalStorage.js
 ┣ utils/
 ┃ ┗ scheduler.js
⚡ Smart Scheduler (Heuristic RL Logic)
Reorders tasks intelligently based on:
🔋 Energy requirement
🧠 Task difficulty
✅ Completion status
Preserves completed tasks in historical slots
Triggered via "Optimize Now"
💾 Persistent State (LocalStorage)
Tasks, focus time, energy levels, distractions are saved
No backend required
Fully reload-safe experience
🧠 AI Productivity Coach

Simulated AI engine that analyzes:

Focus time vs Distractions
Energy levels vs Task difficulty
Current productivity flow

Provides:

Actionable insights
Smart strategy suggestions
📊 Analytics Dashboard
Visual tracking of:
Focus time
Distractions
Productivity trends
🛠️ Tech Stack
Frontend: React 18 + Vite
State Management: Custom Hook (useLocalStorage)
Logic Layer: Heuristic Scheduler (RL-inspired)
Styling: (Add your styling framework if used)
🧪 How It Works
1. Add Tasks

Users input tasks with:

Energy level
Difficulty
2. Optimize Schedule

The scheduler:

Prioritizes high-energy tasks in peak windows
Sorts tasks using heuristic RL logic
3. Track Focus
Timer tracks focus seconds
Distractions are logged
4. Get AI Feedback

Coach analyzes behavior and suggests improvements

🔧 Installation & Setup
# Clone the repository
git clone https://github.com/vedantdubey19/neuroflow.git

# Navigate to project
cd neuroflow

# Install dependencies
npm install

# Run development server
npm run dev
📌 Future Improvements
🔗 Integrate real AI APIs (OpenAI / Gemini)
📱 Mobile responsiveness
☁️ Cloud sync (Firebase / Supabase)
📈 Advanced RL model (Deep Q-Learning)
🎯 Personalized habit learning system
🐛 Bug Fixes
Fixed critical rendering issue in Schedule.jsx (missing icon import)
👨‍💻 Author

Vedant Dubey
Aspiring AI Engineer | Full Stack Developer

🔗 GitHub: https://github.com/vedantdubey19
💼 LinkedIn: (Add your profile link)
⭐ Why This Project Stands Out
Combines AI concepts + real-world productivity
Demonstrates system design + frontend engineering
Shows problem-solving beyond CRUD apps
Strong foundation for AI SaaS product
📜 License

This project is licensed under the MIT License.

If you want, I can also:

🔥 Create a stunning GitHub banner
📸 Add project screenshots section
🌐 Write a portfolio case study
🚀 Help you deploy it (Vercel + domain)

Just tell me 👍
