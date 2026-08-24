# Study Point — MERN Education Platform

A professional, runnable MERN starter for a coaching/education institute.

## Stack
- React + Vite + Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Role-based admin/student access

## Quick start

### 1. Install
```bash
npm install
npm run install-all
```

### 2. Configure backend
Copy `backend/.env.example` to `backend/.env`.

For local MongoDB:
`MONGO_URI=mongodb://127.0.0.1:27017/study_point`

### 3. Start
```bash
npm run dev
```

Frontend: http://localhost:5173

To run the backend and frontend together, configure `backend/.env` first and use:
```bash
npm run dev:full
```

Backend: http://localhost:5000

### Demo accounts
Run the seed script:
```bash
npm run seed --prefix backend
```

Admin:
`admin@studypoint.com` / `Admin@123`

Student:
`student@studypoint.com` / `Student@123`

## Production
Build frontend:
```bash
npm run build
```

Start backend:
```bash
npm start --prefix backend
```

Set `CLIENT_URL` to the deployed frontend URL.

### GoDaddy frontend-only deployment
From the repository root, build the frontend:
```bash
npm run build
```

Upload the contents of `frontend/dist/` to the GoDaddy domain's `public_html` folder. The included `.htaccess` keeps React routes working after refresh.

The public pages and local media work without the backend. Login, registration, dashboards, and enquiry submission require the backend to be hosted and reachable. Set `frontend/.env.production` before building if the API is hosted elsewhere:
```env
VITE_API_URL=https://api.your-domain.example/api
```

If the API is served from the same domain through a proxy, leave `VITE_API_URL` unset in production and the frontend will use `/api`.

## Main API routes
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`
- GET `/api/courses`
- POST `/api/courses` (admin)
- GET `/api/announcements`
- GET `/api/enquiries`
- POST `/api/enquiries`
- GET `/api/admin/stats`
