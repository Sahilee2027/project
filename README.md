# 📌 Task Manager Application

A full-stack **Task Manager** application built using **React (frontend)** and **Node.js + Express + MongoDB (backend)**.  
This app allows users to create, update, delete, and track tasks with audit logging functionality.

## 🚀 Features

### ⭐ Frontend (React)
- Modern UI for managing tasks  
- Create, edit, delete tasks  
- Search tasks by title or description  
- Audit logs display user actions  
- Responsive and fast interface  
- API integration with backend  

### ⭐ Backend (Node.js + Express + MongoDB)
- REST API for full CRUD operations  
- Task schema with timestamps  
- Audit log tracking:  
  - task created  
  - task updated  
  - task deleted  
- MongoDB database integration  
- Input validation using middleware  
- Secure & scalable REST architecture  

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- HTML  
- CSS  
- Axios  
- React Hooks  
- React Router  

### **Backend**
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- dotenv
- 
## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd project

### Backend Setup
cd backend
npm install

###Create a .env file:
MONGO_URI=your_mongodb_url
PORT=5000

### Start Backend
npm run dev

###Frontend Setup
cd ../frontend
npm install
npm start
