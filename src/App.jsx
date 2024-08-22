import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomErrorToastContainer from "./components/helper/showErrorToast";
import Splashscreen from "./pages/splashscreen/Splashscreen";
import Admindashboard from "./pages/admindashboard/Admindashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Forgotpassword from "./pages/forgotpassword/Forgotpassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splashscreen />} />
        <Route path="dashboard" element={<Admindashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpassword" element={<Forgotpassword />} />
      </Routes>
      <CustomErrorToastContainer/>
    </BrowserRouter>
  );
}

export default App;