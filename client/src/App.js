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
// import { DataContext } from "./components/DataProvider";

function App() {
  // const auth = useContext(DataContext);
  const auth = false;

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {auth ? null : <Route path="/login" element={<Login />} />}
            {auth ? null : <Route path="/registration" element={<Registration />} />}
            {auth ? <Route path="/profile" element={<ProfilePage />} /> : null}
            <Route path="/datasets" element={<DatasetPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {auth ? <Route path="/contribute" element={<Contribute />} /> : null}
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}
export default App;
