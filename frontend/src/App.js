import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Landing from "./components/layout/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./pages/About";
import { PostProvider } from "./contexts/PostContext";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Routes>
          <Route path="/" element={<Landing></Landing>}></Route>
          <Route
            path="/login"
            element={<Auth authRoute="login"></Auth>}
          ></Route>
          <Route
            path="/register"
            element={<Auth authRoute="register"></Auth>}
          ></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard></Dashboard>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About></About>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
