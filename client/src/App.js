import "./styles/App.css";
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import DatasetPage from "./pages/DatasetPage";
import DashboardPage from "./pages/DashboardPage";
import Contribute from "./pages/ContributePage";
import CreateDatasetPage from "./pages/CreateDatasetPage";
import { DataContext } from "./components/DataProvider";

function App() {
  const {auth} = useContext(DataContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {auth ? null : <Route path="/login" element={<LoginPage />} />}
            {auth ? null : <Route path="/registration" element={<RegistrationPage />} />}
            {auth ? <Route path="/profile" element={<ProfilePage />} /> : null}
            {auth ? <Route path="/dataset" element={<DatasetPage />} /> : null}
            {auth ? <Route path="/datasets" element={<CreateDatasetPage />} /> : null}
            {auth ? <Route path="/dashboard" element={<DashboardPage />} /> : null}
            {auth ? <Route path="/contribute" element={<Contribute />} /> : null}
            {auth ? <Route path="*" element={<Navigate to="/dashboard" />} /> : <Route path="*" element={<Navigate to="/login" />} />}
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}
export default App;
