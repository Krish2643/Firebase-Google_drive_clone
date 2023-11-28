import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Profile";
import LogOutPage from "./pages/LogOut";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProfilePage from "./pages/Profile";
import NavbarComponent from "./pages/google-drive/Navbar";
import Dashboard from "./pages/google-drive/Dashboard";

function App() {
  return (

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Dashboard/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/hello" element={<LogOutPage/>} />
        <Route path="/folder/:folderId" element={<Dashboard/>}/>
      </Routes>
  );
}

export default App;
