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

### Deploy the backend to Render

The repository includes a `render.yaml` Blueprint for the backend. In Render, create a new Blueprint Instance from the repository and set these environment variables when prompted:

- `MONGO_URI`: your MongoDB Atlas connection string
- `CLIENT_URL`: the deployed frontend URL (or comma-separated frontend URLs)

`JWT_SECRET` is generated automatically by the Blueprint. The service uses the Render-provided `PORT`, starts with `npm start` from the `backend` directory, and exposes `GET /api/health` for health checks. If configuring the service manually, use:

- Root Directory: `backend`
- Build Command: `npm ci`
- Start Command: `npm start`
- Health Check Path: `/api/health`

### Deploy the frontend to Render

Create a Render Static Site for the `frontend` directory with:

- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Environment variable: `VITE_API_URL=https://<your-backend-service>.onrender.com/api`

The frontend reads its API base URL from `VITE_API_URL`; keep `frontend/.env.example` for local configuration and set the deployed backend URL in Render.

### Deploy to GoDaddy

#### GoDaddy Node.js hosting with cPanel

Create two Node.js applications in cPanel. Use the Node.js version offered by your GoDaddy plan, and use the project directories as the application roots.

**Backend application**

- Application root: `backend`
- Startup file: `src/server.js`
- Application URL: `api.your-domain.com`
- Application mode: `Production`

Set these backend environment variables in the cPanel Node.js application:

```env
PORT=5000
MONGO_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-domain.com
```

Upload the `backend` directory without `node_modules` or `.env`, click **Run NPM Install** in cPanel, and restart the application. cPanel supplies the public port, so the app uses `process.env.PORT` automatically. Verify it at `https://api.your-domain.com/api/health`.

**Frontend application**

Build the frontend after setting the backend URL:

```bash
cd frontend
npm ci
npm run build
```

Before building, set `frontend/.env` to:

```env
VITE_API_URL=https://api.your-domain.com/api
```

Then create the second cPanel Node.js application:

- Application root: `frontend`
- Startup file: `server.js`
- Application URL: `your-domain.com`
- Application mode: `Production`

Upload the complete `frontend` directory including `dist`, but excluding `node_modules` and `.env`. Click **Run NPM Install** and restart the application. The existing `frontend/server.js` serves the Vite build and listens on GoDaddy's assigned `PORT`; do not hardcode that port in cPanel.

If your cPanel plan supports only one Node.js application, deploy the backend on Render and use GoDaddy Node.js hosting for the frontend, or upgrade the GoDaddy plan. Keep MongoDB Atlas network access configured for the GoDaddy server.

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
