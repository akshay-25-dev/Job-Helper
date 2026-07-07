# Job Helper — AI-Powered Interview Preparation Platform

An intelligent, full-stack web application that analyzes job descriptions and your profile to generate personalized interview preparation plans, including technical questions, behavioral questions, preparation roadmaps, skill-gap analysis, and tailored resume PDFs.

---

## ✨ Features

- **AI Interview Strategy Generator** — Paste a job description and upload your resume (or type a self-description) to receive a custom interview plan.
- **Technical & Behavioral Questions** — AI-generated questions with model answers and interviewer intent.
- **Preparation Roadmap** — Day-by-day study plan tailored to skill gaps.
- **Match Score** — See how well your profile fits the target role.
- **Skill Gap Analysis** — Identified gaps ranked by severity (high / medium / low).
- **Resume PDF Generation** — Download an optimized resume tailored to the job.
- **Authentication** — Secure JWT-based login/register with HTTP-only cookies.
- **Recent Reports** — Browse and revisit previously generated interview plans.

---

## 🛠 Tech Stack

| Layer      | Technology                                                    |
| ---------- | ------------------------------------------------------------- |
| Frontend   | React 19, React Router 7, Tailwind CSS v4, Vite 7            |
| Backend    | Node.js, Express 5, Mongoose (MongoDB), JWT, bcryptjs         |
| AI         | Google GenAI (`@google/genai`)                                |
| File       | Multer (resume upload), pdf-parse, Puppeteer (PDF generation) |

---

## 📁 Project Structure

```
├── Backend/
│   ├── server.js                 # Entry point
│   ├── .env.example              # Environment variable template
│   └── src/
│       ├── app.js                # Express app setup (CORS, routes)
│       ├── config/
│       │   └── database.js       # MongoDB connection
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── interview.controller.js
│       ├── middlewares/
│       │   ├── auth.middleware.js # JWT verification + blacklist
│       │   └── file.middleware.js # Multer file upload
│       ├── models/
│       │   ├── user.model.js
│       │   ├── blacklist.model.js
│       │   └── interviewReport.model.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   └── interview.routes.js
│       └── services/
│           └── ai.service.js     # Google GenAI integration
│
├── Frontend/
│   ├── index.html
│   ├── vite.config.js            # Vite + Tailwind CSS v4 plugin
│   ├── .env.example              # Environment variable template
│   └── src/
│       ├── main.jsx              # App entry point
│       ├── App.jsx               # Providers + RouterProvider
│       ├── app.routes.jsx        # Route definitions
│       ├── index.css             # Tailwind CSS v4 entry + custom theme
│       └── features/
│           ├── auth/
│           │   ├── auth.context.jsx
│           │   ├── components/
│           │   │   └── Protected.jsx
│           │   ├── hooks/
│           │   │   └── useAuth.js
│           │   ├── pages/
│           │   │   ├── Login.jsx
│           │   │   └── Register.jsx
│           │   └── services/
│           │       └── auth.api.js
│           └── interview/
│               ├── interview.context.jsx
│               ├── hooks/
│               │   └── useInterview.js
│               ├── pages/
│               │   ├── Home.jsx
│               │   └── Interview.jsx
│               └── services/
│                   └── interview.api.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- **MongoDB** instance (local or Atlas)
- **Google GenAI API Key** ([Get one here](https://aistudio.google.com/apikey))

### 1. Clone the repository

```bash
git clone https://github.com/akshay-25-dev/Job-Helper.git
cd Job-Helper
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file based on `.env.example`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
FRONTEND_URL=http://localhost:5173
PORT=3000
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd Frontend
npm install
```

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 🔐 API Endpoints

### Auth

| Method | Endpoint           | Description               | Access  |
| ------ | ------------------ | ------------------------- | ------- |
| POST   | `/api/auth/register` | Register a new user       | Public  |
| POST   | `/api/auth/login`    | Login with email/password | Public  |
| GET    | `/api/auth/logout`   | Logout + blacklist token  | Public  |
| GET    | `/api/auth/get-me`   | Get current user details  | Private |

### Interview

| Method | Endpoint                              | Description                        | Access  |
| ------ | ------------------------------------- | ---------------------------------- | ------- |
| POST   | `/api/interview/`                     | Generate interview report          | Private |
| GET    | `/api/interview/`                     | Get all reports for logged-in user | Private |
| GET    | `/api/interview/report/:interviewId`  | Get report by ID                   | Private |
| POST   | `/api/interview/resume/pdf/:reportId` | Generate tailored resume PDF       | Private |

---

## 🌐 Deployment Notes

When deploying frontend and backend on **different domains**:

1. Set `NODE_ENV=production` in the backend environment.
2. Set `FRONTEND_URL` to your deployed frontend URL in backend `.env`.
3. Set `VITE_API_URL` to your deployed backend URL in frontend `.env`.
4. Cookies are configured with `httpOnly`, `secure`, and `sameSite: "none"` in production for proper cross-origin auth.

---

## 📄 License

This project is open source under the [ISC License](https://opensource.org/licenses/ISC).
