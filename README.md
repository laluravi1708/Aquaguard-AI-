# AquaGuard AI 💧

A professional software-only water monitoring platform. It uses simulated/smart-meter style readings and AI-inspired anomaly detection to identify possible leaks, forecast consumption, estimate cost, and provide water-saving recommendations.

## Stack
- Frontend: React + Vite + Recharts + Lucide React
- Backend: Node.js + Express
- Database: MongoDB (optional; demo mode works without MongoDB)
- Authentication: JWT
- AI/anomaly engine: statistical baseline + rolling z-score + continuous-flow detection

## Run
### Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

### Demo account
Email: `demo@aquaguard.ai`
Password: `Demo@123`

The backend starts in demo mode if MongoDB is not configured. To use MongoDB Atlas, put your URI in `backend/.env`.

## API
- POST `/api/auth/login`
- POST `/api/auth/register`
- GET `/api/dashboard/summary`
- GET `/api/readings`
- POST `/api/readings`
- POST `/api/readings/simulate`
- GET `/api/alerts`
- PATCH `/api/alerts/:id/resolve`
- GET `/api/recommendations`
- GET `/api/reports/usage`
