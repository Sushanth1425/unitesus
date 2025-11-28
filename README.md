# UniteSUS – Employee Task Management System

A full-stack Employee & Task Management Platform built with **React.js, Node.js, Express, MongoDB, and JWT Authentication** that allows Admins to manage employees, assign tasks, track progress, and monitor performance, while Employees can securely log in, view their assigned tasks, and update task statuses.

This project demonstrates structured backend architecture, role-based authentication, and a modern UI with a clean purple-themed design.

---


##  Live Demo

* **Frontend (Vercel):** [https://unitesus.vercel.app/](https://unitesus.vercel.app/)
* **Backend API:** [https://unitesus.onrender.com/](https://unitesus.onrender.com/)

---

##  Features

### Admin Features

* Secure Admin Login
* Create / Edit / Delete Employees
* Assign Tasks to Employees
* View All Employees & Their Tasks
* Analytics Overview (Tasks status distribution)

### Employee Features

* Secure Login with email & password
* View Assigned Tasks
* Change Own Password
* Personal Dashboard

###  Authentication & Security

* JWT-based Authentication
* Role-based Access Control (Admin / Employee)
* Password hashing using bcrypt
* Protected routes on frontend

---

##  Bonus Implementations

*  Role-based middleware (Admin-only routes)
*  Deployment links included
*  Task visualization cards
*  Real-time UI sync after task updates
*  Real database integration

---

##  Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* React Hook Form
* Context API

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcryptjs
* dotenv

---

## 📂 Project Structure

### Backend

```
backend/
│
├── controllers/
│   ├── authController.js
│   ├── employeeController.js
│   └── taskController.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Employee.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   ├── employeeRoutes.js
│   └── taskRoutes.js
│
├── utils/
│   └── seedAdmin.js
│
├── .env
├── ex.env
├── server.js
└── package.json
```

### Frontend

```
frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   └── utils/
├── .env
└── vite.config.js
```

---

# API Overview (Backend)

## Authentication

- **POST /api/auth/login**  
  Login a user by providing email and password.

- **POST /api/auth/register**  
  Register a new user with name, email, and password.

## Employees

- **GET /api/employees**  
  Get a list of all employees.

- **POST /api/employees**  
  Create a new employee.

- **PUT /api/employees/:id**  
  Update an existing employee by their ID.

- **DELETE /api/employees/:id**  
  Delete an employee by their ID.

## Tasks

- **GET /api/tasks**  
  Get a list of all tasks.

- **POST /api/tasks**  
  Create a new task.

- **PUT /api/tasks/:id**  
  Update an existing task by its ID.

- **DELETE /api/tasks/:id**  
  Delete a task by its ID.

---

## Security Features

- **JWT-based Authentication**  
  JSON Web Tokens for secure authentication.

- **Role-based Middleware**  
  Protect routes based on the user's role (e.g., admin, user).

- **Secure Password Hashing**  
  Passwords are securely hashed using bcrypt before being stored.

- **Input Sanitization**  
  Input data is sanitized to prevent malicious inputs.

- **XSS & Injection Protection**  
  Protection against cross-site scripting (XSS) and SQL/NoSQL injection attacks.

- **CORS + Helmet Integration**  
  CORS (Cross-Origin Resource Sharing) is configured, and Helmet is used for security headers.

---

##  Environment Variables

### Backend `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
ADMIN_PWD=Admin@1233#change it if u want
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:5000/api
```

---

##  Test Credentials

### Admin

```
Email: admin@unitesus.com
Password: Admin@123
```

### Employee

```
Email: sus@unitesus.com
Password: sus
```

---

##  Setup Instructions

### 1️. Clone Repository

```bash
git clone https://https://github.com/Sushanth1425/unitesus
cd unitesus
```

### 2️. Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3️. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open browser: [http://localhost:5173](http://localhost:5173)

---

##  Screenshots

#####  Login Page
<img width="1919" height="1000" alt="Image" src="https://github.com/user-attachments/assets/3bfaa29e-5308-47d4-ab6a-d595ce5515a1" />

* Admin Dashboard
* Employee Dashboard
* Task Assignment Screen
* Login Page

---

##  Assumptions

* Admin manually creates employee accounts and assigns passwords
* Employees can update their own passwords anytime
* Tasks are linked to employees using MongoDB ObjectId reference
* Email is used as the unique identifier for authentication
* Only Admin can CRUD employees and tasks
* JWT stored in localStorage for session persistence

---

---

##  Author

**Sushanth Balasekaran**


GitHub: [https://github.com/Sushanth1425](https://github.com/Sushanth1425)

---

