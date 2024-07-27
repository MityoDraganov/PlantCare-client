import "./App.css";

import { Route, Routes } from "react-router-dom";

import { AddCropPot } from "./Pages/AddCropPot/AddCropPot";
import { HomePage } from "./Pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import apiService from "./api/api";
import { Header } from "./components/Header";
import { Dashboard } from "./Pages/Dashboard/Dashboard";

function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    const initializeApiToken = async () => {
      const token = await getToken();
      apiService.token = token;
    };
    initializeApiToken();
  }, [getToken]);

  return (
    <>
      <Header />
      <div className="h-full overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cropPots/assign/:token" element={<AddCropPot />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
