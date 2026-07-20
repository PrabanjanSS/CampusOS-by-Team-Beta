# CampusOS

CampusOS is a modern University Club Management Platform designed to simplify club operations, event management, project collaboration, blogging, leaderboards, and student engagement.

## Features

- 🔐 Role-based authentication
- 👤 Club Member Dashboard
- 👑 Club Lead Dashboard
- 🎓 Faculty Coordinator Dashboard
- 📅 Event Management
- 📝 Club Blogs
- 🖼️ Gallery
- 🏆 Leaderboards
- 📂 Project Collaboration
- 🔔 Notifications
- 📱 Responsive Design

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Firebase Authentication
- Framer Motion
- React Router

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- bcryptjs

## Project Structure

```
CampusOS-Team-Beta/
├── src/                 # Frontend React application
├── backend/            # Backend Express API
│   └── src/
│       ├── config/     # Database configuration
│       ├── controllers/# API controllers
│       ├── models/     # Mongoose models
│       ├── routes/     # API routes
│       └── middlewares/# Auth & role middlewares
├── public/             # Static assets
└── index.html          # Entry HTML
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CampusOS-Team-Beta
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure environment variables**

   **Frontend** (create `.env` in root):
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase configuration
   ```

   **Backend** (create `.env` in `backend/`):
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   cd ..
   ```

5. **Start MongoDB**
   - Make sure MongoDB is running locally or update `MONGO_URI` in `backend/.env` with your MongoDB Atlas connection string.

6. **Run the application**

   **Terminal 1 - Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5004`

   **Terminal 2 - Start Frontend:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## Environment Variables

### Frontend (.env)
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
VITE_API_URL=http://localhost:5004/api
```

### Backend (backend/.env)
```
PORT=5004
MONGO_URI=mongodb://localhost:27017/campusos
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/update-profile` - Update profile

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (lead/faculty)
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

### And more for announcements, gallery, leaderboard, polls, reports...

## Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Vercel will automatically detect Vite configuration
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend (Render/Heroku)
1. Deploy the `backend/` folder
2. Set environment variables (MONGO_URI, JWT_SECRET)
3. Update frontend `VITE_API_URL` to point to deployed backend URL

## License

MIT