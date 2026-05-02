# 🚀 CRM Dashboard – Client Lead Management System

A **Full Stack MERN CRM Application** that helps businesses manage client leads, track status, and maintain follow-ups efficiently.

This project simulates a real-world **Lead Management System used in startups, agencies, and SaaS tools**.

---

## 🔗 Live Demo
Frontend: https://your-frontend-link.netlify.app  
Backend: https://your-backend-link.onrender.com  

---

## 📸 Screenshots

- Dashboard View  
- Add Lead Form  
- Lead Status Tracking  
- Notes Section  
- Login Page  

---

## ✨ Features

### 🧾 Lead Management
- Add new leads (Name, Email, Phone)
- View all leads in dashboard
- Search leads by name/email
- Filter leads by status (New / Contacted / Converted)

### 🔄 Lead Tracking
- Update lead status
- Add notes for follow-ups
- Delete notes
- Delete leads

### 🔐 Authentication
- Admin login using JWT
- Protected routes (frontend + backend)
- Logout functionality

### 📊 Dashboard
- Total leads count
- Contacted leads count
- Converted leads count
- Clean UI dashboard

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- CSS (Custom Styling)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

### Tools
- Git & GitHub
- Postman
- VS Code

---

## 📁 Project Structure
FUTURE_FS_02/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│
└── README.md

---

## ⚙️ Installation Guide
### 1️⃣ Clone Repository```bashgit clone https://github.com/your-username/crm-dashboard.gitcd crm-dashboard

### 2️⃣ Backend Setup
cd backend 
npm install
Create .env file:
PORT=5000MONGO_URI=your_mongodb_connection_stringJWT_SECRET=your_secret_key
Run backend:
npm run dev

### 3️⃣ Frontend Setup
cd frontend
npm install
npm start

### 🔌 API Endpoints
Leads

POST /api/leads → Create lead

GET /api/leads → Get all leads

PUT /api/leads/:id → Update status

POST /api/leads/:id/notes → Add note

DELETE /api/leads/:id/notes/:noteId → Delete note

DELETE /api/leads/:id → Delete lead

Auth

POST /api/auth/login → Admin login

---

## 🔐 Authentication Flow
Admin logs in
JWT token generated
Token stored in localStorage
Protected API calls use token

---
---

## 🎯 Key Learnings
Full Stack CRUD operations
REST API development
JWT Authentication
React state management
MongoDB schema design
Real-world CRM logic

---

---

## 🚀 Future Improvements
Email notifications for leads
Role-based access (Admin/User)
Analytics charts (graphs)
Export leads (CSV/Excel)
Deployment improvements

---

---

## 👨‍💻 Author
Nishchitha
Full Stack Developer (MERN)
Engineering Student

If you like this project:
⭐ Star this repository
📌 Share on LinkedIn
🚀 Add to your portfolio

---
