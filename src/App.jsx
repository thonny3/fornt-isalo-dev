import { Routes, Route } from "react-router-dom";
import Connexion from "./pages/auth/Connexion";
import LoginRoute from "./route/LoginRoute";
import AdminRoute from "./route/AdminRoute";
import LoginProtectRoute from "./protected-route/LoginProtectRoute";
import AdminProtectRoute from "./protected-route/AdminProtectRoute";
import { ToastContainer, toast } from "react-toastify";


function App() {
  return (
    <>
    
      <Routes>
        <Route
          path="/*"
          element={
            <LoginProtectRoute>
              <LoginRoute />
            </LoginProtectRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminProtectRoute>
              <AdminRoute />
            </AdminProtectRoute>
          }
        />
      </Routes>
      <ToastContainer  autoClose={500}/>
    </>
  );
}

export default App;
