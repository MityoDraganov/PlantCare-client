import "./App.css";

import { Route, Routes } from "react-router-dom";

import { AddCropPot } from "./Pages/AddCropPot/AddCropPot";
import { HomePage } from "./Pages/Home/Home";

function App() {
  return (
    <Routes>
      {/* assign crop pot */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cropPots/assign" element={<AddCropPot />} />
    </Routes>
  );
}

export default App;
