import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome";
import Login from "./pages/Login/Login";
import Otp from "./pages/Otp/Otp";
import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/dashboard/Home";
import UserDetails from "./pages/user/UserDetails";
import Clients from "./pages/clients/Clients";
import About from "./pages/about/About";
import UserRegister from "./pages/register/UserRegister";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/UserRegister" element={<UserRegister/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="user" element={<UserDetails />} />
        <Route path="clients" element={<Clients />} />
        <Route path="about" element={<About />} />
        {/* <Route path="profile" element={<Profile/>}/> */}
      </Route>
    </Routes>
  );
}

export default App;
