import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomErrorToastContainer from "./components/helper/showErrorToast";
import Splashscreen from "./pages/splashscreen/Splashscreen";
import Admindashboard from "./pages/admindashboard/Admindashboard";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splashscreen />} />
        <Route path="dashboard" element={<Admindashboard />} />
      </Routes>
      <CustomErrorToastContainer/>
    </BrowserRouter>
  );
}

export default App;