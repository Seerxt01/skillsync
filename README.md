# SkillSync 

SkillSync is a full-stack skill-exchange platform where people trade skills instead of money. Users create profiles, manage teach/learn skills, find matched partners, run exchanges with chat, and earn gamified points.

## Stack
- **Frontend:** React, Tailwind CSS, Framer Motion, Recharts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt hashing

## Folder Structure

```txt
skillsync/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
  frontend/
    src/
      components/
      context/
      layouts/
      pages/
      services/
```

## Quick Start

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` in frontend if your backend runs elsewhere.

## API Highlights
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/dashboard`
- `GET/POST/PATCH/DELETE /api/skills/*`
- `GET /api/matches`
- `GET/POST/PATCH /api/exchanges/*`
- `GET/POST /api/exchanges/:exchangeId/messages`

## Point System
- Teaching session: **+50 XP**
- Learning session: **+20 XP**
- Completing exchange: **+30 XP**

Level thresholds are managed in `backend/src/utils/levels.js`.
