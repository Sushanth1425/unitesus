import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { AuthProvier } from "./context/AuthContext"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminDashboard from "./pages/AdminDashboard"
import UserDashboard from "./pages/UserDashboard"
import EmployeePage from "./pages/EmployeePage"
import Tasks from "./pages/Tasks"

function App() {

  return (
    <AuthProvier>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute role='admin'> <AdminDashboard /> </ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute role='admin'> <EmployeePage /> </ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute role='admin'> <Tasks /> </ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute> <UserDashboard /> </ProtectedRoute>} />
        <Route path="*" element={<ProtectedRoute> <UserDashboard /> </ProtectedRoute>} />
      </Routes>
    </AuthProvier>
  )
}

export default App
