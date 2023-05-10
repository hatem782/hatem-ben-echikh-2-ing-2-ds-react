import { React } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RecettePage from "./pages/RecettePage";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/recette/:_id" element={<RecettePage />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
