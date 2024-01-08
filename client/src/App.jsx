
import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import { AuthProvider } from "./context/AuthContext"
import TasksPage from "./pages/TasksPage"
import TasksFormPage from "./pages/TasksFormPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import ProtectedRoutes from "./pages/ProtectedRoutes"
import { TaskProvider } from "./context/TaskContext"
import Navbar from "./components/Navbar"

function App() {
  return (

    <AuthProvider>

      <TaskProvider>

        <BrowserRouter> 
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={< LoginPage />} />
              <Route path="/register" element={< RegisterPage />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/tasks" element={< TasksPage />} />
                <Route path="/add-tasks" element={<TasksFormPage />} />
                <Route path="/tasks/:id" element={<TasksFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

            </Routes>
          </main>


        </BrowserRouter>


      </TaskProvider>

    </AuthProvider>


  )
}

export default App