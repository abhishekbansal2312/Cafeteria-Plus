# DineSync - Seamless Dining Experience 🍽️

![Untitled design (1)](https://github.com/user-attachments/assets/88b04b6f-443c-4181-bcb7-5d49fc54ae7a)


**A full-stack MERN application for a seamless dining experience, built with Vite for fast frontend performance.**

## 🚀 Features
- **User Authentication** (Signup, Login, JWT-based auth)
- **Counter & Dish Management** (Create, Read, Update, Delete operations)
- **Cart Functionality** (Add, Remove, Checkout)
- **Review System** (Leave and manage reviews)
- **Pagination & Filtering** (Efficient data handling)
- **Dark Mode Support** (Theme toggling)

## 🏗️ Tech Stack
### Backend (Node.js, Express, MongoDB)
- **Express.js** - Fast backend API
- **MongoDB + Mongoose** - Database and ODM
- **JWT Authentication**
- **Middleware** (Authentication, Pagination, Filters)

### Frontend (React, Vite, Tailwind CSS, Redux Toolkit)
- **React.js** - Component-based UI
- **Vite** - Optimized React development
- **Tailwind CSS** - Modern UI styling
- **Redux Toolkit** - State management

## 📂 Project Structure
```
DineSync/
├── backend/
│   ├── controllers/    # Business logic
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Authentication & pagination
│   ├── utils/          # Helper functions
│   ├── server.js       # Entry point
│   └── config/db.js    # Database connection
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Routes and views
│   │   ├── slices/     # Redux state management
│   │   ├── store/      # Redux store setup
│   │   ├── hooks/      # Custom React hooks
│   │   └── context/    # Theme context
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── vite.config.js
│   └── tailwind.config.js
```

## 🎮 Getting Started
### Prerequisites
- **Node.js** (v16+ recommended)
- **MongoDB** (Local or Atlas)
- **Vite** (For frontend development)

### Installation
```sh
# Clone the repository
git clone https://github.com/abhishekbansal2312/DineSync-SeamlessDining
cd dinesync-seamlessdining
```
#### Backend Setup
```sh
cd backend
npm install
npm start # Runs on http://localhost:3000
```
#### Frontend Setup
```sh
cd frontend
npm install
npm run dev # Runs on http://localhost:5173
```

## ⚡ API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | /api/dishes | Get all dishes |
| POST | /api/dishes | Add a new dish |
| GET | /api/counters | Get all counters |
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Authenticate user |
........

More API details are available in the `routes/` folder.

## ✨ Contributing
1. Fork the project
2. Create a new branch (`feature-branch`)
3. Commit changes (`git commit -m 'Add feature X'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## 📜 License
This project is licensed under the **MIT License**.

---
🔗 **Live Demo**: https://dine-sync-seamless-dining.vercel.app/] 
📩 **Contact**: [abhishekbansal2312@gmail.com](mailto:abhishekbansal2312@gmail.com)

---
Give this repo a ⭐ if you like it! 🚀

