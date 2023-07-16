import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Login from "./components/LoginForm";
import Registration from "./components/RegistrationForm";
import ProfilePage from "./pages/ProfilePage";
import DatasetPage from "./pages/DatasetPage";
import DashboardPage from "./pages/DashboardPage";
import Contribute from "./pages/ContributePage";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies("");
  const auth = cookies.name > 0;
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/datasets" element={<DatasetPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/contribute" element={<Contribute />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
