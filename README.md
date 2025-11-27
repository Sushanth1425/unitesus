# uniteSUS 

A role-based task & employee management backend built with **Node.js, Express, MongoDB, and JWT Authentication**.

This backend powers the Dev Colab platform, enabling admins to manage employees and tasks, while regular users can view assigned data securely.

---

## 🚀 Tech Stack (Backend)

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* BcryptJS (Password hashing)
* Express Validator
* Helmet & CORS
* Role-based Access Control (Admin/User)

---

## 📁 Project Structure

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

---

## ✅ Backend Status

✔ Authentication System
✔ JWT Token Validation
✔ Role-Based Access Control
✔ Admin-only Protected Routes
✔ CRUD for Employees
✔ CRUD for Tasks
✔ Admin Seeder Script
✔ Input Validation & Security Middleware

🎯 **Backend is production-ready and complete.**
We can safely move to frontend development.

---

## 🔧 Installation & Setup

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Copy `ex.env` and rename to `.env`

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/devcolab
JWT_SECRET=your_jwt_secret
ADMIN_PWD=Admin@123
```

### 4. Run Admin Seeder

Creates default admin account

```bash
npm run seedAdmin
```

### 5. Start Server

```bash
npm run dev
```

Server runs on: `http://localhost:5000`

---

## 🔐 Default Admin Credentials

```
Email: admin@unitesus.com
Password: (value from ADMIN_PWD in .env)
```

---

## 📡 API Documentation

### 🔑 Authentication

#### Register User

POST `/api/auth/register`

```json
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "123456"
}
```

#### Login

POST `/api/auth/login`

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "JWT_TOKEN_HERE"
}
```

---

## 👥 Employee Routes

| Method | Endpoint           | Role       | Description       |
| ------ | ------------------ | ---------- | ----------------- |
| GET    | /api/employees     | User/Admin | Get all employees |
| POST   | /api/employees     | Admin      | Create employee   |
| PUT    | /api/employees/:id | Admin      | Update employee   |
| DELETE | /api/employees/:id | Admin      | Delete employee   |

Sample Create Employee

```json
{
  "name": "Alice",
  "email": "alice@gmail.com",
  "department": "Design"
}
```

---

## ✅ Task Routes

| Method | Endpoint       | Role       | Description   |
| ------ | -------------- | ---------- | ------------- |
| GET    | /api/tasks     | User/Admin | Get all tasks |
| POST   | /api/tasks     | Admin      | Create task   |
| PUT    | /api/tasks/:id | Admin      | Update task   |
| DELETE | /api/tasks/:id | Admin      | Delete task   |

Sample Create Task

```json
{
  "title": "Fix UI",
  "assignedTo": "EMPLOYEE_ID",
  "status": "pending"
}
```

---

## 🛡 Security Features

* Password hashing with bcrypt
* JWT Authorization headers
* Admin-only middleware
* Helmet for HTTP protection
* Input Sanitization
* SQL Injection & XSS Prevention (validated inputs)
* CORS Protection

---

## 📜 Available Commands

| Command           | Description             |
| ----------------- | ----------------------- |
| npm run dev       | Run backend in dev mode |
| npm start         | Run production server   |
| npm run seedAdmin | Create default admin    |

---

## 🧪 Testing API

Use Postman or Thunder Client with header:

```
Authorization: Bearer <your_token>
```

---

## 📌 Next Step

✅ Backend Completed
➡ Ready for Frontend Implementation

Frontend Plan:

* React + Vite
* Tailwind CSS v4
* Dark Mode Toggle
* Secure Forms
* Input Validation & XSS Protection
* Role-based UI (Admin/User Dashboards)

---

## 🧠 Future Enhancements

* Real-time notifications (WebSocket)
* Activity logs
* Role hierarchy (Manager, HR)
* Task progress tracker

---

## 👨‍💻 Author

Sushanth Balasekaran
Frontend Developer / MERN Stack Developer

---

✅ Backend Module Completed Successfully
Ready to move forward 🚀
